import { FC, memo, useEffect } from 'react'

const Page: FC<{ value: number[] }> = memo((props) => {
  useEffect(() => {
    console.log('我挂载了')
  })
  return (
    <>
      <div>{props.value}</div>
    </>
  )
})

export default Page
