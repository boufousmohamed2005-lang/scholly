import React from 'react'
import { BrowserRouter,Routes,Route, Outlet  } from 'react-router-dom';
import Students from '../DashBoard/components/Students';
const Laya = () => {
  return (
    <>
       <BrowserRouter >
        
            <Routes>
              <Route path='/student' component={<Students />}/>
              
            </Routes>
           </BrowserRouter>
       <Outlet />
    </>
  )
}

export default Laya
