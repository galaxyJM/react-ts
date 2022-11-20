import { useCallback, useEffect, useState } from "react"

interface msgProps {
  name: string,
  format: boolean,
  expandAll: boolean,
  data: { tag?: string, brief: string, num: number, time: string },
}

function Message(props: msgProps) {
  const { name, data, expandAll, format } = props
  const [isExpand, setIsExpand] = useState(false)
  function handleExpand() {
    setIsExpand(!isExpand)
  }
  useEffect(() => {
    if (expandAll) {
      setIsExpand(true)
    } else {
      setIsExpand(false)
    }
  }, [expandAll])
  return (
    <div className={`container ${isExpand ? "expanded" : ""}`} onClick={handleExpand}>
      <div className="info" >{name}</div>
      <div className="brief">{!format ? data.brief :
        !isExpand ? data.brief : <ul>
          {data.brief.split('\n')[0] + data.brief.split('\n')[1]}
          {data.brief.split('\n').slice(2, data.brief.split('\n').length).map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      }</div>
      <div className="numAndTime">Patchset {data.num} | {data.time}</div>
    </div>
  )
}

export default Message
