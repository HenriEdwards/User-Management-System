import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import { Login, UserInfo, Credential, UpdateUser, NotFound, ManageUser } from './pages/index'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={<Login />}
        />
        <Route 
          path='/user-page'
          element={<UserInfo />}
        />
        <Route 
          path='/credential-repo'
          element={<Credential />}
        />
        <Route 
          path='/manage-users'
          element={<ManageUser />}
        />
        <Route 
          path='/update-user/:id'
          element={<UpdateUser />}
        />
        <Route 
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;