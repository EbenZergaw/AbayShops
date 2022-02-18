import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function NewItemForm() {

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

    const params = useParams();
    const postItem = () => {
        
        const data = {}
        // CONVERTS IMAGE TO BASE64 THEN SENDS DATA THROUGH CALLBACK
        getBase64(document.getElementById('photo').files[0], (x) => {
            data.imgString = x.split("base64,")[1];

            data.id = params.id
            data.storeName = params.storeName
            data.itemName = document.getElementById('itemName').value
            data.price = document.getElementById('price').value
            data.quantity = document.getElementById('quantity').value
            
            axios.post('http://localhost:5000/postItem', data)
        })
    }

  return (
    <div className="container">
        <h1>Add New Item</h1>

        <img src="" style={{width: "100%"}}alt=""/>

        <input type="file" id="photo" onChange={previewImage}/>

        <input type="text" id='itemName' placeholder='Item Name' />
        <br />
        <input type="number" id='price' placeholder='Price' />
        <br />
        <input type="text" id='quantity' placeholder='Quantity' />
        <br />
        <button onClick={postItem}>Submit</button>
        <br />
        <button>Cancel</button>

    </div>
  )
}

export default NewItemForm