import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function BuyItemForm({itemData, setView}) {

    console.log(itemData)
    const [formView, setFormView] = useState('buyerInfo')
    const [orderInfo, setOrderInfo] = useState({})
    const params = useParams()
    
    useEffect(() => {
        setFormView('buyerInfo')
    }, [])
  
    const handleBuy = () => {
        console.log(itemData._id)
        axios.post(`http://localhost:27017/neworder/${params.storeCode}/${itemData._id}`, orderInfo)
        .then((res) => {
            setView('orderConfirmation')
        })
        .catch((error) => {
            console.log(error);
        })
    }

    if(formView === 'buyerInfo'){
        return (
            <div>
                <h1>Enter Your Information</h1>
                <input type="text" id='firstName' placeholder='First Name' />
                <br />
                <input type="text" id='lastName' placeholder='Last Name' />
                <br />        
                <input type="tel" id='phone' placeholder='Phone Number' />
                <br />
                <button onClick={() => {
                    setFormView('infoConfirmation')
                    let orderData = {
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        phone: document.getElementById('phone').value
                    }
                    setOrderInfo(orderData)
                }}>Continue</button>
            </div>
        )
    } else if (formView === 'infoConfirmation'){
        return(
            <div>
                <h1>Review Your Order</h1>
                <div className="">
                    <img src={"data:image/png;base64, " + itemData.imgString} alt="" />
                    <h3>{itemData.itemName}</h3>
                    <h3>{itemData.price} birr</h3>
                    <h3>Name: {orderInfo.firstName} {orderInfo.lastName}</h3>
                    <h3>Phone Number: {orderInfo.phone}</h3>
                </div>
                <button className="button-outline">Back</button>
                <button className="float-right" onClick={handleBuy}>BUY</button>
            </div>
        )
    }
}

export default BuyItemForm