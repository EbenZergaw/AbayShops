import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { use } from 'express/lib/router'
import { isBrowser } from 'react-device-detect'

function ItemThumbnail({ itemID, setPushToItemsArray, setSelectedItem, setView, itemsArray, setItemsArray, loading}) {

  const [thumbnailView, setThumbnailView] = useState('loading')
  const [item, setItem] = useState({})

  useEffect(() => {
    if(itemsArray.length > 0){
      itemsArray.forEach((item) => {
        if(item._id == itemID){
          setItem(item)
        }
      })
      
      setThumbnailView('loaded')

    } else {
      if(!itemsArray.some(e => e._id == itemID)){
        axios.get(`https://abay-shops.herokuapp.com/image/${itemID}`)
        .then((res) => {
          setPushToItemsArray(res.data)
          setItem(res.data)
          setThumbnailView('loaded')
        })
      }
    }
    if(!itemsArray.some(e => e._id == itemID)){
      axios.get(`https://abay-shops.herokuapp.com/image/${itemID}`)
      .then((res) => {
        setPushToItemsArray(res.data)
        setItem(res.data)
        setThumbnailView('loaded')
      })
    }
  }, [])

  

  if(thumbnailView === 'loaded' && item.imgString != undefined){

    if(isBrowser == true){
      return(
      <div className="card card-side w-5/12 float-left bg-base-100 shadow-xl my-3 mx-3">
        <figure><img className='w-60' src={"data:image/png;base64, " + item.imgString} alt="" /></figure>
        <div className="card-body">
          <h2 className="card-title">{item.itemName}</h2>
          <h3 className='text-2xl font-semibold'>{item.price} birr</h3>
          <div className="card-actions">
            <button className="btn-primary btn-primary btn" onClick={() => {
                setView('viewItem')
                setSelectedItem(item)}}>VIEW
            </button>
          </div>
        </div>
      </div>
      )
    }
    
    return (
      <div className='container card card-bordered shadow-lg mb-4'>
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

  } else {

    return(
      <div className="btn loading btn-block my-5">loading</div>
    )
  }

    
}

export default ItemThumbnail