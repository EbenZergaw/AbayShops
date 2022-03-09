import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import ItemThumbnail from './ItemThumbnail'
import ItemView from './ItemView'
import BuyItemForm from './BuyItemForm'

function StorePage() {

    const [loaded, setLoaded] = useState(false)
    const [seller, setSeller] = useState({})
    const [items, setItems] = useState([])
    const [view, setView] = useState('thumbnail') 
    const [itemData, setItemData] = useState()
    const params = useParams()

    useEffect(() => {
        setView('viewItem')
    }, [itemData])

    useEffect(() => {
        setView('thumbnail')
        axios.get(`/store/${params.storeCode}`)
        .then((res) => {
            setItems(res.data.items)
            setSeller(res.data)
        })
    }, [])

    if(view === 'thumbnail'){
        return(
            <div className="container">
                <h1>{seller.storeName}</h1>
                <br /><br />
                {items.map((item, index) => {
                    return(
                        <ItemThumbnail id={item} key={index} setItemData={setItemData}></ItemThumbnail>
                    )
                })}
            </div>
        )
        
    } else if(view === 'viewItem'){
        return(
            <div className="container">
                <ItemView itemData={itemData} setView={setView} view={view}></ItemView>
            </div>
        )
    } else if(view === 'buyForm'){
        return(
            <div className="container">
                <BuyItemForm itemData={itemData} setView={setView}></BuyItemForm>
            </div>
        )
    } else if(view === 'orderConfirmation'){
        return(
            <div className="container">
                <h1>Your Order Is Successful</h1>
                <h2>The seller will contact you to complete your transaction.</h2>
                <h3>Seller Name: {seller.firstName} {seller.lastName}</h3>
                <h3>Seller Phone Number: {seller.phone}</h3>
                <h3>Seller Telegram: <a href={`https://t.me/${seller.username}`}>@{seller.username}</a></h3>
            </div>
        )
    }
}

export default StorePage