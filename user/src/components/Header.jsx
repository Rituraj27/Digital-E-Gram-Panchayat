import React from 'react'
import logo from './../assets/emblem.svg';
import amrit from './../assets/logo-amrit2.png';
import swachh from './../assets/swachh2.png';


const Header = () => {
  return (
    <div className='px-[5vw] py-2   w-full flex justify-between items-center'>
    <div className='flex items-center gap-1 md:gap-3'>
      <img src={logo} alt="logo" className='w-12 h-12 lg:h-28 lg:w-28' />
      <div>
          <h1 className='text-xl lg:text-5xl jost md:text-3xl'>DigitalGramSwaraj</h1>
          <p className='hidden w-40 text-gray-500 lg:w-96 text-md md:block'>Simplified Work Based Accounting Application for Panchayati Raj</p>
      </div>
    </div>
    <div className='flex gap-3'>
      <img src={swachh} alt="" className='w-12 lg:w-24 md:w-16'/>
      <img src={amrit} alt="" className='w-12 lg:w-32 md:w-24'/>
    </div>
  </div>
  )
}

export default Header
