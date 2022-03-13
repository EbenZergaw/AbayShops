import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AdminSellerCard from '../components/AdminSellerCard'

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
              setRegisterMsg(<div className="alert alert-success shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Seller has been registered</span>
              </div>
            </div>)
            }
        })
        .catch((err) => {
          setRegisterMsg(<div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error! Something went wrong.</span>
            <span>Error: {err}</span>
          </div>
        </div>)
        })
    }
  return (
    <div className='prose mt-10 w-screen'>
      <h1 className='ml-4 text-primary'>Admin Panel</h1>
<hr />
      <div className="w-screen container">


        <div tabIndex="0" className="collapse mx-auto">
          <input type="checkbox"/> 
          <div className="collapse-title text-xl font-medium">
            <button className="btn btn-block">Register Seller</button>
          </div>
          <div className="collapse-content form-control">
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
              <br />
              <button className='btn btn-outline' onClick={registerSeller}>Register</button>

              <div className="container card">
                <h2>{registerMsg}</h2>
              </div>
          </div>
        </div>
        

        <div tabIndex="0" className="collapse">
          <input type="checkbox"/> 
          <div className="collapse-title text-xl font-medium mx-auto">
            <button className="btn btn-block mx-auto">Seller List</button>
          </div>
          <div className="collapse-content"> 
            {sellers.map((seller, index) => {
                return(
                  <div className="card w-80 mb-4">
                    <AdminSellerCard seller={seller} key={index}></AdminSellerCard>
                  </div>
                )
            })}
          </div>
        </div>

      
      </div>


      
    </div>

  )
}

export default AdminPage