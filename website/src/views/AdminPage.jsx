import React, {useState, useEffect} from 'react'
import axios from 'axios'

function AdminPage() {

  const [registerMsg, setRegisterMsg] = useState('')
  const [sellers, setSellers] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setRegisterMsg('')
    }, 5000)
  }, [registerMsg])

  useEffect(() => {
    axios.get(`https://abay-shops.herokuapp.com/all`)
    .then((res) => {
      console.log(res)
        setSellers(res.data)
    })
}, [])

    const registerSeller = () => {
        const data = {}
        data.name = document.getElementById('name').value
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
    <div className='prose'>
      <h1>Admin Panel</h1>

      <div className="flex flex-row w-screen">

      {/* Register Seller */}
      <div tabIndex="0" className="collapse collapse-arrow basis-1/5">
        <input type="checkbox" /> 

        <div class="collapse-title text-xl font-medium">
          Register Seller
        </div>

        <div className="collapse-content">
          <div className="form-control">
            <input type="text" className='input input-primary' id='name' placeholder=' Name' />
            <br />
            <input type="text" className='input input-primary' id='phone' placeholder='Phone' />
            <br />
            <input type="text" className='input input-primary'  id='userName' placeholder='Telegram Username' />
            <br />
            <input type="text" className='input input-primary'  id='storeCode' placeholder='Store Code' />
            <br />
            <input type="text" className='input input-primary'  id='key' placeholder='Key' />
            <br />
            <input type="text" className='input input-primary'  id='storeName' placeholder='Store Name' />
            <br />
            <textarea name="misc" className='input input-primary' id="misc" cols="30" rows="10" placeholder='Miscellaneous'></textarea>
            <button className='btn' onClick={registerSeller}>Register</button>

            <div className="container card">
              <h2>{registerMsg}</h2>
            </div>
          </div>
        </div>
      </div>

      <div tabIndex="0" className="collapse collapse-arrow basis-1/5">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium">
          Seller List
        </div>
        <div class="collapse-content"> 

        {/*  MAKE LIST OF SELLERS */}
          <p>tabindex="0" attribute is necessary to make the div focusable</p>
        </div>
      </div>
      
    </div>
    
    </div>
  )
}

export default AdminPage