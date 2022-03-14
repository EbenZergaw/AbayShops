import React from 'react'
import { Link } from 'react-router-dom'
import homepageGraphic from '../assets/homepageGraphic.png'

function HomePage() {
  return (
    <div className="container pb-10">
        <h1 className='text-primary mt-10 text-6xl font-bold'>Abay Shops</h1>
        <h2 className='font-light mt-12 text-3xl'>An online shopping platform integrated with Telegram</h2>

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

export default HomePage