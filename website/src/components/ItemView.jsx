import React from 'react'

function ItemView({itemData, view, setView}) {
    // const [view, setView] = useState()
    
    console.log(itemData)
    if(view === 'viewItem'){
        return (
            <div className='container'>
                <br /><br />
                <img src={"data:image/png;base64, " + itemData.imgString} alt="" />
                <h1>{itemData.itemName}</h1>
                <h2>{itemData.price} birr</h2>
                <h3>{itemData.quantity} left</h3>
                <p>{itemData.desc}</p>
                <button className='button button-outline' onClick={() => setView('thumbnail')}>Back</button>
                <button className='button float-right' onClick={() => setView('buyForm')}>BUY</button>
            </div>
          )
    } else {
        return (
            <div className="container"></div>
        )
    }
  
}

export default ItemView