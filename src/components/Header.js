import React from 'react'
import './Header.css'
import logo from '../assets/logo.png'


export default function Header() {
  return (
    <>
    <header>
        <img src={logo} className='logo' alt='logo' />
        <p className='heading'>bswl-TODO LIST</p>
        {/* <div className='themes'>THEMES</div> */}
        
    </header>
    <hr/>
    </>
    
  )
}
