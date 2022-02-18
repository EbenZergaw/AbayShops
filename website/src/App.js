
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom'
import AdminPage from './views/AdminPage'
import SellerView from './views/SellerView';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/admin" element={<AdminPage/>}></Route>

          <Route path="/:storeName/:id/*" element={<SellerView/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
