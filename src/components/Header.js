import React from 'react'
import './Header.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <>
    <header>
        <Link to="/" className='logo-link'><img src={logo} className='logo' alt='logo' /><p className='heading'>TodoList</p></Link>
        
        <Link to="/recycle-bin" className='nav-link'>Recycle Bin</Link>
        
    </header>
    <hr/>
    </>
    
  )
}
