import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'remax/wechat';
const Snow = ({ icon }) => {
  const transition = `all ${3000 + 7000 * Math.random()}ms ease-in`;
  const [style, setStyle] = useState({
    position: 'fixed',
    transition,
    transform: `translate(${(Math.random() * 100).toFixed()}vw, 0)`,
    opacity: 1
  })
  useEffect(() => {
    setTimeout(() => {
      setStyle({
        ...style,
        transform: `translate(${(Math.random() * 100).toFixed()}vw, 80vh)`,
        opacity: 0
      })
    }, 0)
  }, [icon])
  return <Text style={style}>{icon}</Text>
}
const SnowFall = ({ icon }) => {
  const [snows, setSnows] = useState([])
  const snowfallInterval = useRef()
  useEffect(() => {
    // 每隔一段时间生成一片雪花
    snowfallInterval.current = setInterval(() => {
      const snow = Math.random()
      snows.push(snow)
      setSnows(snows)
    }, 100)
    return () => {
      clearInterval(snowfallInterval.current)
    }
  }, [icon])
  return <>
    {snows.map(snow => <Snow icon={icon} key={snow}/>)}
  </>
}
export default SnowFall