import React from 'react'
import { useParams, Routes, Route } from 'react-router-dom'

import NewItemForm from '../components/NewItemForm';
import StorePage from '../components/StorePage'

function SellerView() {

    const params = useParams()

  return (
      <Routes>
          <Route path='/newitem/*' element={<NewItemForm/>}></Route>
          <Route path='/' element={<StorePage/>}></Route>
      </Routes>
  )
}

export default SellerView