import React, { useEffect, useState } from 'react'
import './Counter.css'
export default function Counter({tasks}) {
    const [count,setCount]=useState(tasks.length)
    useEffect   (() => {
        setCount(tasks.length)
    }, [tasks])
    return (
        <div className='counterelement'>
            <div className='counter'>
                <p className='sentence'>Number of Tasks:  </p>
                <div>{count}</div>
            </div>
        </div>
    
  )
}
