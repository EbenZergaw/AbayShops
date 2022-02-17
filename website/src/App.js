
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom'
import AdminPage from './views/AdminPage'

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/admin" element={<AdminPage/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
