import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'remax/wechat';
const Snow = ({ icon }) => {
  const transition = `${3000 + 7000 * Math.random()}ms`;
  const [style, setStyle] = useState({
    top: `0%`,
    left: `${(Math.random() * 100).toFixed()}%`,
    position: 'fixed',
    transition,
  })
  useEffect(() => {
    setTimeout(() => {
      setStyle({
        ...style,
        top: `100%`,
        left: `${(Math.random() * 100).toFixed()}%`,
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