import { useMemo, useState } from 'react'
import Page from './Page'

const MemoTest = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount((s) => s + 1)}> 添加 {count}</button>
      <Page value={[1, 2, 3]} />
    </>
  )
}

export default MemoTest
