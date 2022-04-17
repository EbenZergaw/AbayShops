import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {isBrowser} from 'react-device-detect'

function BuyItemForm({itemData, setView}) {

    const [formView, setFormView] = useState('buyerInfo')
    const [orderInfo, setOrderInfo] = useState({})
    const [formValAlert, setFormValAlert] = useState(false)
    const params = useParams()
    
    useEffect(() => {
        if(formValAlert != ''){

            setTimeout(() => {
                setFormValAlert('')
            }, 3000);
        }
    }, [formValAlert])
  
    const handleBuy = () => {
        setView('loading')
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
                <h1 className='text-3xl my-10'>Enter Your Information</h1>
                {formValAlert}
                <input type="text" className="input input-bordered input-primary" id='firstName' placeholder='First Name' required/>
                <br />
                <input type="text" className="input input-bordered input-primary" id='lastName' placeholder='Last Name' required/>
                <br />        
                <input type="tel"  className="input input-bordered input-primary" id='phone' placeholder='Phone Number' required/>
                <br />
                <button className='btn btn-primary' onClick={() => {
                    let orderData = {
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        phone: document.getElementById('phone').value
                    }
                    if(orderData.firstName == '' || orderData.lastName == '' || orderData.phone == ''){
                        setFormValAlert(<div className='alert alert-error mb-2'>Please enter your information</div>)
                    } else {
                        setOrderInfo(orderData)
                        setFormView("infoConfirmation")
                    }
                }}>Continue</button>
                <button className="btn btn-outline btn-block mt-4" onClick={() => setView('viewItem')}>Back</button>
            </div>
        )
    } else if (formView === 'infoConfirmation'){
        if(isBrowser == true){
            return(
                <div className="container mx-auto">
                    
                    <h1 className='text-3xl font-bold mt-10 mb-5'>Review Your Order</h1>
                    <div className="card card-side bg-base-100 shadow-xl mt-10">
                        <figure><img className='w-96' src={"data:image/png;base64, " + itemData.imgString} alt=""/></figure>
                        <div className="card-body">
                        <h2 className='text-2xl mt-4 font-semibold'>{itemData.itemName}</h2>
                        <h3 className='mt-4'>{itemData.price} birr</h3>
                        <h3 className='mt-4'>Name: {orderInfo.firstName} {orderInfo.lastName}</h3>
                        <h3 className='mt-4'>Phone Number: {orderInfo.phone}</h3>

                        <button className='btn w-1/2 btn-primary mt-10' onClick={() => handleBuy()}>BUY</button>
                        <button className='btn btn-ghost w-1/2 mt-4' onClick={() => {
                            setFormView('buyerInfo')
                            }}>Back
                        </button>
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div className='container'>
                <h1 className='text-3xl font-bold mt-10 mb-5'>Review Your Order</h1>
                <div className="card">
                    <img src={"data:image/png;base64, " + itemData.imgString} alt="" />
                    <h2 className='text-2xl mt-4 font-semibold'>{itemData.itemName}</h2>
                    <h3 className='mt-4'>{itemData.price} birr</h3>
                    <h3 className='mt-4'>Name: {orderInfo.firstName} {orderInfo.lastName}</h3>
                    <h3 className='mt-4'>Phone Number: {orderInfo.phone}</h3>
                </div>
                <button className="btn btn-primary btn-block mt-4" onClick={() => handleBuy()}>BUY</button>
                <br /><br />
                <button className="btn btn-outline btn-block" onClick={() => setFormView('buyerInfo')}>Back</button>
            </div>
        )
    }
}

export default BuyItemForm