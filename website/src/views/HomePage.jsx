import React from 'react'
import homepageGraphic from '../assets/homepageGraphic.png'

function HomePage() {
  return (
    <div className="container prose">
        <h1 className='text-primary mt-10'>Abay Shops</h1>
        <h2 className='font-light'>An online shopping platform integrated with telegram</h2>

        <div className="container card">
          <img src={homepageGraphic} className='container mx-auto' />
          <div className="card-body">
            <p>Manage your orders</p>
          </div>
        </div>

      <div class="mockup-phone">
        <div class="camera"></div> 
          <div class="display">
            <div class="artboard artboard-demo phone-1">Hi.</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage