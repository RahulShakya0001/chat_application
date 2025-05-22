import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={ <Navigate to="/auth" replace /> }></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App