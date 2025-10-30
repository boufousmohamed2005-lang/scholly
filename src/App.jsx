import React  from 'react'
import { router } from '../Router/router'
import { RouterProvider } from 'react-router-dom'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    
    <RouterProvider router={router} />
   
    </>
  )
}

export default App
