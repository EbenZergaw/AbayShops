import React, { useState, useEffect } from 'react'
import LoadingPage from '../components/LoadingPage'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Stores() {

    const [loading, setLoading] = useState(true)
    const [sellers, setSellers] = useState([])

    useEffect(() => {
        axios.get(`https://abay-shops.herokuapp.com/all`)
        .then((res) => {
            setSellers(res.data)
            setLoading(false)
        })
        }, [])
  
    if(loading === true){
        return(
            <LoadingPage></LoadingPage>
        )
    } else {
        return(
            <div className="container">
                <h1 className='text-primary mt-10 text-6xl font-bold'>Stores</h1>

                <div className="container">
                    
                {sellers.map((seller, index) => {
                return(
                  <Link to={`/${seller.storeCode}`} className="card shadow-lg card-bordered my-10 p-10">
                    <span className="text-3xl text-primary">{seller.storeName}</span>
                    <span>{seller.items.length} products</span>
                  </Link>
                )
                })}
            
                </div>
            </div>
        )
    }
}

export default Stores