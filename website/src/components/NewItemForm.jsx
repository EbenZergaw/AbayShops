import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function NewItemForm() {
    
    const [view, setView] = useState('loading')
    const params = useParams();

    function useQuery() {
      const { search } = useLocation();
    
      return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    
    const query = useQuery()

    useEffect(() => {
      axios.get(`https://abay-shops.herokuapp.com/valkey/${params.storeCode}/${query.get('key')}`)
      .then((res) => {
        if(res.status === 200){
          setView('form')
        }
      })
      .catch((err) => {
        if(err.response.status === 401){
          setView('error')
        }
      })
    }, [])
    

    // INSERT IMAGE INTO DOM WHEN UPLOADED
    const previewImage = () => {
      var preview = document.querySelector('img');
      let file = document.getElementById('photo').files[0]
      var reader  = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;
      }
    
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
  }

  const getBase64 = (file, cb) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
          cb(reader.result)
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
  }

  const postItem = (e) => {
    e.preventDefault()
    const data = {}
    // CONVERTS IMAGE TO BASE64 THEN SENDS DATA THROUGH CALLBACK
    getBase64(document.getElementById('photo').files[0], (x) => {
        data.imgString = x.split("base64,")[1];

        data.key = params.key
        data.storeCode = params.storeCode
        data.itemName = document.getElementById('itemName').value
        data.price = document.getElementById('price').value
        data.quantity = document.getElementById('quantity').value
        data.desc = document.getElementById('desc').value
        
        
        setView('loading')

        axios.post('https://abay-shops.herokuapp.com/postItem', data)
        .then((res) => {
          setView('complete')
        })
        .catch((err) => {
          setView('error')
          // TODO - ERROR HANDLING
        })
    })
  }
      
    
  if(view === 'form'){
    return (
      <form className="container" onSubmit={e => postItem(e)}>
          <h1>Add New Item</h1>
  
          <img src="" style={{width: "100%"}}alt=""/>
  
          <input type="file" id="photo" onChange={previewImage}/>
          <br />
          <input type="text" id='itemName' placeholder='Item Name' required/>
          <br />
          <input type="number" id='price' placeholder='Price' required/>
          <br />
          <input type="number" id='quantity' placeholder='Quantity' required/>
          <br />
          <textarea name="desc" id="desc" cols="30" rows="10" placeholder='Description'></textarea>
          <input type="submit" value={'Submit'} />
          {/* <button onClick={postItem}>Submit</button> */}
          <br />
          <button className='button button-outline'>Cancel</button>
  
      </form>
    )
  } else if (view === 'complete'){
    return(
      <div className="container">
        <h1>Your Item Has Been Uploaded</h1>
        <h2>Check Telegram For Next Steps</h2>
      </div>
    )
  } else if (view === 'error'){
    return(
      <div className="container">
        <h1>ERROR</h1>
        <h2>Please try again</h2>
      </div>
    )
  } else if (view === 'loading'){
    return(
      <div className="container">
        <h1>LOADING...</h1>
      </div>
    )
    
  }

  
}

export default NewItemForm