import React from 'react'
import LoadingPage from './LoadingPage'

function ItemView({itemData, view, setView}) {
    // const [view, setView] = useState()
    
    if(view === 'viewItem'){
        return (
            <div className='container prose'>
                <br /><br />
                <img src={"data:image/png;base64, " + itemData.imgString} alt="" />
                <h1>{itemData.itemName}</h1>
                <h2>{itemData.price} birr</h2>
                <h3>{itemData.quantity} left</h3>
                <p>{itemData.desc}</p>
                <button className='btn btn-block btn-primary' onClick={() => setView('buyForm')}>BUY</button>
                <br /><br />
                <button className='btn btn-block' onClick={() => setView('thumbnail')}>Back</button>
            </div>
          )
    } else {
        return (
            <LoadingPage></LoadingPage>
        )
    }
  
}

export default ItemView