import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

function ItemThumbnail({id, setIsBuying, setItemData}) {

  const [buyItemData, setBuyItemData] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios.get(`https://abay-shops.herokuapp.com/image/${id}`)
    .then((res) => {
      setBuyItemData(res.data)
      setLoaded(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [id])

  if(loaded === false){
    return(
      <div className="container">
        <br /><br />
       <button className="btn btn-square loading btn-block"></button>
       <br /><br />
      </div>
    )
  } else {
    return (
      <div onClick={() => {
        setItemData(buyItemData)
        }} className='container card card-bordered'>
        <img src={"data:image/png;base64, " + buyItemData.imgString} alt="" />
  
        <div className="card-body prose">
          <h2 className=''>{buyItemData.itemName}</h2>
          <h3>{buyItemData.price} birr</h3>
          <span>{buyItemData.quantity} left</span>
          <br></br>
          <button className="btn-primary btn-outline btn">VIEW</button>
          {/* <button className='thumbnailBtn' onClick={() => {
            setItemData(buyItemData)
            }}>VIEW</button> */}
        </div>
        
      </div>
    )
  }

  

  
}

export default ItemThumbnail