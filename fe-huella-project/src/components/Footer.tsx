
import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (

    <footer className=' w-[100%] h-[5.5rem] flex justify-between p-8 mt-4 bg-white footer-1 p-top[25%]'>
      
      <h5 className=''>© Huellap 2024</h5>
      <Link to={"/about"} className='text-orange-huella' > Sobre Nosotros</Link>
        
      </footer>

// import React from 'react'
import { Link } from 'react-router-dom'
export const Footer = () => {
  return (
    <footer className=' mt-auto footer-1 '>
    <h5></h5>
    </footer>

  )
}
