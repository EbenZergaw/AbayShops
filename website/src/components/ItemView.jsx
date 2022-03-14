import React from 'react'
import LoadingPage from './LoadingPage'

function ItemView({itemData, view, setView, setSelectedItem}) {
    // const [view, setView] = useState()
    
    if(view === 'viewItem'){
        return (
            <div className='container pb-6'>
                <br /><br />
                <img src={"data:image/png;base64, " + itemData.imgString} alt="" />
                <h1 className='font-bold text-3xl pt-4'>{itemData.itemName}</h1>
                <h2 className='text-2xl font-semibold pt-3'>{itemData.price} birr</h2>
                <h3 className='text-xl pt-2'>{itemData.quantity} left</h3>
                <p className='text-xl mt-3'>{itemData.desc}</p>
                <button className='btn btn-block btn-primary mt-3' onClick={() => setView('buyForm')}>BUY</button>
                <br /><br />
                <button className='btn btn-block' onClick={() => {
                    setView('thumbnail')
                    }}>Back</button>
            </div>
          )
    } else {
        return (
            <LoadingPage></LoadingPage>
        )
    }
  
}

export default ItemView