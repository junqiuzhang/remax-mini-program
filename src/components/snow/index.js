import React, { useEffect, useState } from 'react';
import { Text } from 'remax/wechat';
const Snow = ({ icon }) => {
  const transition = `all ${3000 + 3000 * Math.random()}ms ease-in`;
  const [style, setStyle] = useState({
    position: 'fixed',
    transition,
    transform: `translate(${(Math.random() * 100).toFixed()}vw, -10vh)`,
    opacity: 1
  })
  useEffect(() => {
    setTimeout(() => {
      setStyle({
        ...style,
        transform: `translate(${(Math.random() * 100).toFixed()}vw, 90vh)`,
        opacity: 0
      })
    }, 0)
  }, [icon])
  return <Text style={style}>{icon}</Text>
}
const SnowFall = ({ icon, number = 30 }) => {
  const snows = [];
  for (let i = 0; i < number; i++) {
    snows.push(<Snow icon={icon} key={i}/>)
  }
  return snows;
}
export default SnowFall