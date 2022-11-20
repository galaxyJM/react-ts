import { useRef, useState } from 'react'
import Message from './Message'
import './message.scss'
const json1 = {
  name: "Luigi Toscano",
  data: {
    tag: "Verified +1",
    brief: "Build succeeded (check pipeline). \n  \n - openstack-tox-molecule https://zuul.opendev.org/t/openstack/build/b218ec9b40b442a5874fc571e5d3b5e5 : SUCCESS in 3m 29s \n - openstack-tox-linters https://zuul.opendev.org/t/openstack/build/1533443fa79543c7bd8480f9952b09aa : SUCCESS in 6m 47s \n - tripleo-tox-molecule https://zuul.opendev.org/t/openstack/build/89dd9757afac45de86ac26bb64bff03b : SUCCESS in 4m 47s \n - tripleo-upgrade-centos-8-molecule https://zuul.opendev.org/t/openstack/build/2da7b8f6b542438b8209c903c3f3cfdb : SUCCESS in 10m 29s",
    num: 1,
    time: "Nov 30, 2020 18:24"
  }
}
const json2 = {
  name: "Luigi Toscano",
  data: {
    tag: "Verified +1",
    brief: "this comment is used to test the format of the website, please ignore it.",
    num: 1,
    time: "Nov 30, 2020 18:24"
  }
}
function App() {
  let indicator = useRef<HTMLDivElement>(null)
  let startWidth = useRef<HTMLDivElement>(null)
  let tabControl = useRef<HTMLDivElement>(null)
  let [method, setMethod] = useState('开始')
  const [expandAll, setExpandAll] = useState(false)
  function adjustIndicatorPos(farther: HTMLElement, child: HTMLElement, indicator: HTMLDivElement) {
    let { width: targetWidth, left: targetLeft } = child.getBoundingClientRect()
    let { left: containerLeft } = farther.getBoundingClientRect()
    if (indicator) {
      indicator.style.setProperty('width', `${targetWidth + 10}px`)
      indicator.style.setProperty('left', `${targetLeft - containerLeft - 5}px`)
    }
  }
  function handleLoginMethod(e: any) {
    let target = e.target
    let name = target.classList[0]
    if (name === e.currentTarget.className || name === 'indicator') {
      return
    }
    if (method !== name) {
      target.classList.add('selected')
      Array.from(e.currentTarget.children).find((child: any) => {
        return child.classList[0] === method
      })?.classList.remove('selected')
    }
    if (indicator.current) {
      adjustIndicatorPos(e.currentTarget, target, indicator.current)
    }
    if (name) {
      setMethod(name)
    }
  }
  return (
    <div className="App">
      <div ref={tabControl} className="tabControl" onClick={(e) => handleLoginMethod(e)}>
        <span className='开始' ref={startWidth}>开始</span>
        <span className='结束'>结束</span>
        <div className="indicator" ref={indicator}></div>
      </div>
      <div className='expandAll'><button onClick={() => { setExpandAll(!expandAll) }}>expand all</button></div>
      {method === "开始" && new Array(9).fill(1).map((item, index) => {
        return <Message key={index} name={json1.name} data={json1.data} format={true} expandAll={expandAll} />
      })}
      {method === "开始" &&  <Message name={json2.name} data={json2.data} format={false} expandAll={expandAll} />}
      {method === "结束" && <div>测试</div>}
    </div>
  )
}

export default App
