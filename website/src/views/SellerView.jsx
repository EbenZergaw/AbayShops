import React from 'react'
import { useParams, Routes, Route } from 'react-router-dom'

import NewItemForm from '../components/NewItemForm';

function SellerView() {

    const params = useParams()

    console.log(params);

  return (
      <Routes>
          <Route path='/newitem' element={<NewItemForm/>}></Route>
      </Routes>
  )
}

export default SellerView