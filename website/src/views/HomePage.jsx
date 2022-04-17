import React from 'react'
import { Link } from 'react-router-dom'
import {isBrowser} from 'react-device-detect'
import homepageGraphic from '../assets/homepageGraphic.png'
import logoBanner from '../assets/logoBanner.png'

function HomePage() {

  if(isBrowser == true){
    return (
      <div className="container mx-auto">
        <h1 className='text-primary font-bold'>
          <img className='mt-10 w-80' src={logoBanner} alt="Abay Shops" title='Abay Shops' />
        </h1>
        <h2 className='font-light mt-10 text-3xl'>An online shopping platform integrated with Telegram</h2>
        <img src={homepageGraphic} className='w-80 float-left' />
        <div className="card-body float-left mt-20">
            <span className="text-3xl">Benefits</span>
            <li className='text-2xl'>Manage your inventory</li>
            <li className='text-2xl'>Track your orders</li>
            <li className='text-2xl'>Fulfill your sales</li>
          </div>

          
          <div className="card-body float-right">
            <span className="text-3xl">Are you interested?</span>
            <Link to="/stores" className='btn w-60 btn-primary float-right mt-4'>VIEW STORES</Link>
            <a href="https://t.me/e_been" className="btn w-60 btn-primary mt-4">CONTACT</a>
          </div>
      </div>
    )
  } else {
    return (
      <div className="container pb-10">
        
          <h1 className='text-primary text-6xl font-bold'>
            <img className='mt-10' src={logoBanner} alt="Abay Shops" title='Abay Shops' />
          </h1>
  
          <h2 className='font-light mt-10 text-3xl'>An online shopping platform integrated with Telegram</h2>
  
          <div className="divider"></div>
          <Link to="/stores" className='btn btn-block btn-primary'>VIEW STORES</Link>
  
          <img src={homepageGraphic} className='container mx-auto' />
          <div className="card-body">
            <span className="text-3xl">Benefits</span>
            <li className='text-2xl'>Manage your inventory</li>
            <li className='text-2xl'>Track your orders</li>
            <li className='text-2xl'>Fulfill your sales</li>
          </div>
  
          <div className="divider"></div>
  
          <div className="card-body">
            <span className="text-3xl">Are you interested?</span>
            <a href="https://t.me/e_been" className="btn btn-block btn-primary mt-10">CONTACT</a>
          </div>
  
      </div>
    )
  }
  
}

export default HomePage