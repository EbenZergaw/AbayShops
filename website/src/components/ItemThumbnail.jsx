import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

function ItemThumbnail({id, setIsBuying, setItemData}) {

  const [buyItemData, setBuyItemData] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:27017/image/${id}`)
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
      <div className="card">
        <h4>Loading</h4>
      </div>
    )
  } else {
    return (
      <div onClick={() => {
        setItemData(buyItemData)
        }} className='card'>
        <img src={"data:image/png;base64, " + buyItemData.imgString} alt="" />
  
        <div className="info">
          <h4>{buyItemData.itemName}</h4>
          <span>{buyItemData.price} birr</span>
          <br />
          <span>{buyItemData.quantity} left</span>
          <br></br>
          {/* <button className='thumbnailBtn' onClick={() => {
            setItemData(buyItemData)
            }}>VIEW</button> */}
        </div>
        
      </div>
    )
  }

  

  
}

export default ItemThumbnail