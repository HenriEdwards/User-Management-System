import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import UserLanding from './pages/UserLanding';
import Credentials from './pages/Credentials';
import ManageUsers from './pages/ManageUsers';
import UserUpdate from './pages/UserUpdate';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
    <BrowserRouter>
    <div>
      <Routes>
        <Route 
          path='/'
          element={<Home />}
        />
        <Route 
          path='/user-page'
          element={<UserLanding />}
        />
        <Route 
          path='/credential-repo'
          element={<Credentials />}
        />
        <Route 
          path='/manage-users'
          element={<ManageUsers />}
        />
        <Route 
          path='/update-user/:id'
          element={<UserUpdate />}
        />
        <Route 
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;