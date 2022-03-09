import React, {useState, useEffect} from 'react'
import axios from 'axios'

function AdminPage() {

  const [registerMsg, setRegisterMsg] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setRegisterMsg('')
    }, 5000)
  }, [registerMsg])

    const registerSeller = () => {
        const data = {}
        data.firstName = document.getElementById('firstName').value
        data.lastName = document.getElementById('lastName').value
        data.phone = document.getElementById('phone').value
        data.username = document.getElementById('userName').value
        data.storeCode = document.getElementById('storeCode').value
        data.key = document.getElementById('key').value
        data.storeName = document.getElementById('storeName').value
        data.misc = document.getElementById('misc').value

        axios.post('https://abay-shops.herokuapp.com/newseller', data)
        .then((res) => {
            if(res.status === 201){
              setRegisterMsg('Seller has been registered')
            }
        })
    }
  return (
    <div className='container'>
        <h1>Register Seller</h1>

        <input type="text" id='firstName' placeholder='First Name' />
        <br />
        <input type="text" id='lastName' placeholder='Last Name' />
        <br />
        <input type="text" id='phone' placeholder='Phone' />
        <br />
        <input type="text" id='userName' placeholder='Telegram Username' />
        <br />
        <input type="text" id='storeCode' placeholder='Store Code' />
        <br />
        <input type="text" id='key' placeholder='Key' />
        <br />
        <input type="text" id='storeName' placeholder='Store Name' />
        <br />
        <textarea name="misc" id="misc" cols="30" rows="10" placeholder='Miscellanoues'></textarea>
        <button className='button' onClick={registerSeller}>Register</button>

        <div className="container card">
          <h2>{registerMsg}</h2>
        </div>
    </div>
  )
}

export default AdminPage