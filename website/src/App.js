
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AdminPage from './views/AdminPage'
import SellerView from './views/SellerView';
import HomePage from './views/HomePage';
import Stores from './views/Stores';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/admin" element={<AdminPage/>}></Route>
          <Route path="/:storeCode/*" element={<SellerView/>}></Route>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/stores" element={<Stores/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
