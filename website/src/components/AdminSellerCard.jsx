import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminSellerCard({seller}) {
    let nav = useNavigate()
  return (
    <div className="card card-bordered bg-neutral sellerCard" to={"/" + seller.storeCode}>
        <div className="card-body">
            <span className="card-title">{seller.storeName}</span>
            <span>{seller.name}</span>
            <span className='text-primary'>Number of Items: {seller.items.length}</span>
            <span className='text-primary'>Number of Orders: {seller.orders.length}</span>
            <button className="btn btn-primary" onClick={() => {nav(`/${seller.storeCode}`)}}>View</button>
        </div>
    </div>
  )
}

export default AdminSellerCard