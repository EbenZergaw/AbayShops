import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import ItemThumbnail from './ItemThumbnail'
import ItemView from './ItemView'
import BuyItemForm from './BuyItemForm'
import LoadingPage from './LoadingPage'
import ErrorPage from './ErrorPage'

function StorePage() {

    const [sellerData, setSellerData] = useState({items: []})
    const [itemsID, setItemsID] = useState([])
    const [view, setView] = useState('thumbnail') 
    const [itemsArray, setItemsArray] = useState([])
    const [pushToItemsArray, setPushToItemsArray] = useState()
    const [selectedItem, setSelectedItem] = useState({})
    const params = useParams()

    useEffect(() => {
        if(pushToItemsArray != undefined){
            // temp = itemsArray
            // temp.push(pushToItemsArray)
            setItemsArray([...itemsArray, pushToItemsArray])
        }
    }, [pushToItemsArray])

    useEffect(() => {
        axios.get(`https://abay-shops.herokuapp.com/store/${params.storeCode}`)
        .then((res) => {
            setSellerData(res.data)
        })
    }, [])

    if(view === 'thumbnail'){
        if(isBrowser == true){
            return(
                <div className="container mx-auto">
                    <h1 className='text-5xl font-bold mt-4'>{sellerData.storeName}</h1>
                    <div className="mt-10 float-left w-10/12">
                    {sellerData.items.map((itemID, index) => 
                        (
                            <ItemThumbnail itemID={itemID} key={index} setSelectedItem={setSelectedItem} setView={setView} itemsArray={itemsArray} setItemsArray={setItemsArray} setPushToItemsArray={setPushToItemsArray} loading={false}></ItemThumbnail>
                        )
                    )}
                    </div>
                    <div className="float-right">
                        <h4 className='font-bold text-2xl'>Seller Contact</h4>
                        <span>{sellerData.name}</span>
                        <br />
                        <span>{sellerData.phone}</span>
                    </div>
                </div>
            )
        }
        return(
            <div className="container">
                
                <h1 className='text-5xl font-bold mt-4'>{sellerData.storeName}</h1>

                <div className=" mt-6">
                {sellerData.items.map((itemID, index) => 
                    (
                        <ItemThumbnail itemID={itemID} key={index} setSelectedItem={setSelectedItem} setView={setView} itemsArray={itemsArray} setItemsArray={setItemsArray} setPushToItemsArray={setPushToItemsArray} loading={false}></ItemThumbnail>
                    )
                )}
                </div>
                
            </div>
        )
    } else if(view === 'viewItem'){
        if(isBrowser == true){
            return(
                <div className="container mx-auto">
                    <h1 className='text-5xl font-bold mt-4'>{sellerData.storeName}</h1>
                    <ItemView itemData={selectedItem} setView={setView} view={view} setSelectedItem={setSelectedItem}></ItemView>
                </div>
            )
        }
        return(
            <div className="container">
                <h1 className='text-5xl font-bold mt-4'>{sellerData.storeName}</h1>
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
                <Link to='/stores' className="btn btn-primary btn-block mt-10">Continue to Browse</Link>
            </div>
        )
    } else if(view === 'error'){
        return(
            <ErrorPage></ErrorPage>
        )
    } else if(view === 'loading'){
        return(
            <LoadingPage></LoadingPage>
        )
    }
}

export default StorePage