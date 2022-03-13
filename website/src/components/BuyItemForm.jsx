import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function BuyItemForm({itemData, setView}) {

    const [formView, setFormView] = useState('buyerInfo')
    const [orderInfo, setOrderInfo] = useState({})
    const params = useParams()
    
    // useEffect(() => {
    //     setFormView('buyerInfo')
    // }, [])
  
    const handleBuy = () => {
        axios.post(`https://abay-shops.herokuapp.com/neworder/${params.storeCode}/${itemData._id}`, orderInfo)
        .then((res) => {
            setView('orderConfirmation')
        })
        .catch((error) => {
            console.log(error);
        })
    }

    if(formView === 'buyerInfo'){
        return (
            <div className='form-control'>
                <h1>Enter Your Information</h1>
                <input type="text" className="input input-bordered input-primary" id='firstName' placeholder='First Name' />
                <br />
                <input type="text" className="input input-bordered input-primary" id='lastName' placeholder='Last Name' />
                <br />        
                <input type="tel"  className="input input-bordered input-primary" id='phone' placeholder='Phone Number' />
                <br />
                <button className='btn btn-primary' onClick={() => {
                    let orderData = {
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        phone: document.getElementById('phone').value
                    }
                    setOrderInfo(orderData)
                    setFormView("infoConfirmation")
                }}>Continue</button>
            </div>
        )
    } else if (formView === 'infoConfirmation'){
        return(
            <div className='prose'>
                <h1>Review Your Order</h1>
                <div className="">
                    <img src={"data:image/png;base64, " + itemData.imgString} alt="" />
                    <h2>{itemData.itemName}</h2>
                    <h3>{itemData.price} birr</h3>
                    <h3>Name: {orderInfo.firstName} {orderInfo.lastName}</h3>
                    <h3>Phone Number: {orderInfo.phone}</h3>
                </div>
                <button className="btn btn-primary btn-block" onClick={handleBuy}>BUY</button>
                <br /><br />
                <button className="btn btn-outline btn-block" onClick={() => setFormView('buyerInfo')}>Back</button>
            </div>
        )
    }
}

export default BuyItemForm