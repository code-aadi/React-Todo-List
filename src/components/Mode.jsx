import React from 'react'

const Mode = ({setIsDark , isDark}) => {
  return (
    <button className='mode'
    onClick={()=>{
setIsDark(!isDark)
    }}
    >
 {isDark? "Light": "Dark"}
    </button>
  )
}

export default Mode
