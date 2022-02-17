import React from 'react'
import axios from 'axios'

function AdminPage() {
    const registerSeller = () => {
        const data = {}
        data.firstName = document.getElementById('firstName').value
        data.lastName = document.getElementById('lastName').value
        data.phone = document.getElementById('phone').value
        data.username = document.getElementById('userName').value
        data.storeName = document.getElementById('storeName').value
        data.storeCode = document.getElementById('storeCode').value

        axios.post('http://localhost:5000/newseller', data)
        .then(({data}) => {
            console.log(data.msg);
        })
    }
  return (
    <div className='container'>
        <h1>Register Seller</h1>

        <input type="text" id='firstName' placeholder='First Name' />
        <br />
        <input type="text" id='lastName' placeholder='Last Name' />
        <br />
        <input type="tel" id='phone' placeholder='Phone' />
        <br />
        <input type="username" id='userName' placeholder='User Name' />
        <br />
        <input type="text" id='storeName' placeholder='Store Name' />
        <br />
        <input type="text" id='storeCode' placeholder='Store Code' />
        <br />
        <button onClick={registerSeller}>Register</button>
    </div>
  )
}

export default AdminPage