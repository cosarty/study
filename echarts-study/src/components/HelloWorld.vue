<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts-gl' // 3d图表库
import { onMounted, ref } from 'vue'

// defineProps<{ msg: string }>()

import { getPie3D, getParametricEquation } from './chart.ts' //工具类js，页面路径自己修改

const color = ['#21da98', '#f4af00', '#1fc4fc']

const chart = ref()
const data = ref<any>({
  optionData: [
    {
      name: '测试1',
      value: 288,
    },
    {
      name: '测试2',
      value: 700,
    },
    {
      name: '测试3',
      value: 540,
    },
  ],
  statusChart: null,
  option: {},
})

// 初始化label样式
const setLabel = () => {
  data.value.optionData.forEach((item, index) => {
    item.itemStyle = {
      color: color[index],
    }

    item.label = {
      normal: {
        show: true,
        color:'#fff',
        backgroundColor:color[index],
        // formatter: ['{b|{b}}', '{c|{c}}{b|台}', '{d|{d}%}'].join('\n'), // 用\n来换行
        formatter: '{d|{d}%}', // 用\n来换行
        padding: [3, 4, 3, 6],
        width: 60,
        // height:
        borderRadius: 20,
        rich: {
          // b: {
          //   color: '#fff',
          //   lineHeight: 25,
          //   align: 'left',
          // },
          // c: {
          //   fontSize: 10,
          //   color: '#fff',
          //   textShadowColor: '#1c90a6',
          //   textShadowOffsetX: 0,
          //   textShadowOffsetY: 2,
          //   textShadowBlur: 5,
          // },
          d: {
            color: '#fff',
            // color: color[index],
            align: 'center',
  
          },
        },
      },
    }
    item.labelLine = {
      normal: {
        lineStyle: {
          width: 1,
          // color: 'rgba(255,255,255,0.7)',
          join: 'miter',
          miterLimit: 4,
          color:color[index]
        },
      },
    }
  })
}
const bindListen = (myChart, optionName = 'option') => {
  let selectedIndex = ''
  let hoveredIndex = ''
  // 监听点击事件，实现选中效果（单选）
  myChart.on('click', (params) => {
    // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
    const isSelected =
      !data.value[optionName].series[params.seriesIndex].pieStatus.selected
    const isHovered =
      data.value[optionName].series[params.seriesIndex].pieStatus.hovered
    const k = data.value[optionName].series[params.seriesIndex].pieStatus.k
    const startRatio =
      data.value[optionName].series[params.seriesIndex].pieData.startRatio
    const endRatio =
      data.value[optionName].series[params.seriesIndex].pieData.endRatio
    // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
    if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
      data.value[optionName].series[selectedIndex].parametricEquation =
        getParametricEquation(
          data.value[optionName].series[selectedIndex].pieData.startRatio,
          data.value[optionName].series[selectedIndex].pieData.endRatio,
          false,
          false,
          k,
          data.value[optionName].series[selectedIndex].pieData.value
        )
      data.value[optionName].series[selectedIndex].pieStatus.selected = false
    }
    // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
    data.value[optionName].series[params.seriesIndex].parametricEquation =
      getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        data.value[optionName].series[params.seriesIndex].pieData.value
      )
    data.value[optionName].series[params.seriesIndex].pieStatus.selected =
      isSelected
    // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
    selectedIndex = isSelected ? params.seriesIndex : null
    // 使用更新后的 option，渲染图表
    myChart.setOption(data.value[optionName])
  })
  // 监听 mouseover，近似实现高亮（放大）效果
  myChart.on('mouseover', (params) => {
    // 准备重新渲染扇形所需的参数
    let isSelected
    let isHovered
    let startRatio
    let endRatio
    let k
    // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    if (hoveredIndex === params.seriesIndex) {
      // 否则进行高亮及必要的取消高亮操作
    } else {
      // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
      if (hoveredIndex !== '') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
        isSelected =
          data.value[optionName].series[hoveredIndex].pieStatus.selected
        isHovered = false
        startRatio =
          data.value[optionName].series[hoveredIndex].pieData.startRatio
        endRatio = data.value[optionName].series[hoveredIndex].pieData.endRatio
        k = data.value[optionName].series[hoveredIndex].pieStatus.k
        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        data.value[optionName].series[hoveredIndex].parametricEquation =
          getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            data.value[optionName].series[hoveredIndex].pieData.value
          )
        data.value[optionName].series[hoveredIndex].pieStatus.hovered =
          isHovered
        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex = ''
      }
      // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
      if (
        params.seriesName !== 'mouseoutSeries' &&
        params.seriesName !== 'pie2d'
      ) {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        const pieStatus =
          data.value[optionName].series[params.seriesIndex].pieStatus
        const pipeData =
          data.value[optionName].series[params.seriesIndex].pieData
        isSelected = pieStatus ? pieStatus.selected : false

        isHovered = true
        startRatio = pipeData ? pipeData.startRatio : 0

        endRatio = pipeData ? pipeData.endRatio : 0
        k = pieStatus ? pieStatus.k : 1
        // 对当前点击的扇形，执行高亮操作（对 option 更新）
        data.value[optionName].series[params.seriesIndex].parametricEquation =
          getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            (pipeData?.value || 0) + 60
          )

        pieStatus.hovered = isHovered
        // 记录上次高亮的扇形对应的系列号 seriesIndex
        hoveredIndex = params.seriesIndex
      }
      // 使用更新后的 option，渲染图表
      myChart.setOption(data.value[optionName])
    }
  })
  // 修正取消高亮失败的 bug
  myChart.on('globalout', () => {
    // 准备重新渲染扇形所需的参数
    let isSelected
    let isHovered
    let startRatio
    let endRatio
    let k
    if (hoveredIndex !== '') {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      isSelected =
        data.value[optionName].series[hoveredIndex].pieStatus.selected
      isHovered = false
      k = data.value[optionName].series[hoveredIndex].pieStatus.k
      startRatio =
        data.value[optionName].series[hoveredIndex].pieData.startRatio
      endRatio = data.value[optionName].series[hoveredIndex].pieData.endRatio
      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      data.value[optionName].series[hoveredIndex].parametricEquation =
        getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          data.value[optionName].series[hoveredIndex].pieData.value
        )
      data.value[optionName].series[hoveredIndex].pieStatus.hovered = isHovered
      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex = ''
    }
    // 使用更新后的 option，渲染图表
    myChart.setOption(data.value[optionName])
  })
}
// 图表初始化
const initChart = () => {
  data.value.statusChart = echarts.init(chart.value)
  // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
  data.value.option = getPie3D(data.value.optionData, 0, 700, 25, 14, 1)
  data.value.statusChart.setOption(data.value.option)
  // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
  data.value.option.series.push({
    name: '电梯状态', //自己根据场景修改
    backgroundColor: 'transparent',
    type: 'pie',
    label: {
      opacity: 1,
      fontSize: 30,
      lineHeight: 20,
    },
    startAngle: 16, // 起始角度，支持范围[0, 360]。
    clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: '40%',
    center: ['30%', '50%'],
    data: data.value.optionData,
    labelLayout:function (params) {
      console.log('params: ', params);
      const index = params.dataIndex
      // 判断label在图表的左侧还是右侧
      // const isLeft = params.labelRect.x < myChart.clientWidth / 2
      // const points = params.labelLinePoints
      // console.log('points: ', points)

      // // 设置线结束点的位置
      // points[2][0] = isLeft
      //   ? params.labelRect.x
      //   : params.labelRect.x + params.labelRect.width
      // points[2][0] = 0
      let pointer = [[params.rect.x + 30, params.rect.y + 80], [params.rect.x + 30, params.rect.y + 80], [params.rect.x + 30, params.rect.y - 0]]
      if (index === 0) {
        pointer = [[params.rect.x + 50, params.rect.y + 100], [params.rect.x + 50, params.rect.y + 100], [params.rect.x + 50, params.rect.y + 20]]
        params.rect.x +=20
        params.rect.y +=10
  }
      return {
        labelLinePoints: pointer,
        // rotate:-180
        x:params.rect.x + 30,
        // y: params.rect.y + params.rect.height / 2,
        y: params.rect.y - 0,

        // verticalAlign: 'middle',
        align: 'middle'
      }
    },
    itemStyle: {
      opacity: 0, //这里必须是0，不然2d的图会覆盖在表面
    },
    labelLine: {
      show: true,
      lineStyle: {
        color: 'red',
      },
    },
  })
  data.value.statusChart.setOption(data.value.option)
  // bindListen(data.value.statusChart)
}

// 自适应宽高
const changeSize = () => {
  data.value.statusChart.resize()
}

onMounted(() => {
  initChart()

  //根据窗口变化自动调节图表大小

  window.onresize = function () {
    changeSize()
  }
})

setLabel()
</script>

<template>
  <div class="chart-container">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<style scoped lang="scss">
.chart-container {
  background-color: rgba($color: red, $alpha: 0.1);
  .chart {
    height: 300px;
    width: 300px;
  }
}
</style>
