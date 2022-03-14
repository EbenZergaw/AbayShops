import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import ItemThumbnail from './ItemThumbnail'
import ItemView from './ItemView'
import BuyItemForm from './BuyItemForm'
import LoadingPage from './LoadingPage'
import ErrorPage from './ErrorPage'

function StorePage() {

    const [sellerData, setSellerData] = useState({items: []})
    const [itemsID, setItemsID] = useState([])
    const [view, setView] = useState('thumbnail') 
    let [itemsArray, setItemsArray] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const params = useParams()

    useEffect(() => {
        setView('viewItem')
    }, [selectedItem])

    useEffect(() => {
        setView('loading')
        axios.get(`https://abay-shops.herokuapp.com/store/${params.storeCode}`)
        .then((res) => {
            setSellerData(res.data)
        })
    }, [])


    let temp;
    useEffect(() => {
        if(sellerData.items.length > 0){
            sellerData.items.forEach((itemID, index) => {
                axios.get(`https://abay-shops.herokuapp.com/image/${itemID}`)
                .then((res) => {
                    temp = itemsArray
                    temp.push(res.data)
                    setItemsArray(temp)
                    if(itemsArray.length == sellerData.items.length){
                        setView('thumbnail')
                    }     
                })
                .catch((err) => {
                    console.log(err);
                })
                   
            })
                
        }
    }, [sellerData])

    useEffect(() => {
        // setSelectedItem({})
    }, [view])

    if(view === 'loading'){
        return(
            <div className='container'>
                <LoadingPage></LoadingPage>
            </div>
        )
    } else if(view === 'thumbnail'){
        return(
            <div className="container">
                
                <h1 className='text-5xl mt-4'>{sellerData.storeName}</h1>

                <div className=" mt-6">
                {itemsArray.map((item, index) => 
                    (
                        <ItemThumbnail item={item} key={index} setSelectedItem={setSelectedItem} setView={setView}></ItemThumbnail>
                    )
                )}
                </div>
                
            </div>
        )
    } else if(view === 'viewItem'){
        return(
            <div className="container">
                <h1 className='text-5xl mt-4'>{sellerData.storeName}</h1>
                <ItemView itemData={selectedItem} setView={setView} view={view} setSelectedItem={setSelectedItem}></ItemView>
            </div>
        )
    } else if(view === 'buyForm'){
        return(
            <div className="container">
                <BuyItemForm itemData={selectedItem} setView={setView}></BuyItemForm>
            </div>
        )
    } else if(view === 'orderConfirmation'){
        return(
            <div className="container mt-10">
                <div className="alert-success rounded mt-4 mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h1 className='text-4xl font-bold ml-4 pb-4'>Your Order Is Successful</h1>
                </div>
                <h2 className='text-2xl my-2'>The seller will contact you to complete your transaction.</h2>
                <p className='text-2xl my-1'>Seller Name: {sellerData.name}</p>
                <p className='text-2xl my-1'>Seller Phone Number: {sellerData.phone}</p>
                <p className='text-2xl my-1'>Seller Telegram: <a href={`https://t.me/${sellerData.username}`}>@{sellerData.username}</a></p>
            </div>
        )
    } else if(view === 'error'){
        return(
            <ErrorPage></ErrorPage>
        )
    }
}

export default StorePage