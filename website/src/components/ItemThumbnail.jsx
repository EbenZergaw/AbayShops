import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

function ItemThumbnail({item, setSelectedItem, setView}) {

    return (
      <div className='container card card-bordered'>
        <img className='w-5/6 mx-auto mb-0' src={"data:image/png;base64, " + item.imgString} alt="" />
  
        <div className="card-body">
          <h2 className='text-3xl font-bold'>{item.itemName}</h2>
          <h3 className='text-2xl font-semibold'>{item.price} birr</h3>
          <span>{item.quantity} left</span>
          <br></br>
          <button className="btn-primary btn-primary btn" onClick={() => {
            setView('viewItem')
            setSelectedItem(item)}}>VIEW</button>
        </div>
        
      </div>
    )  
}

export default ItemThumbnail