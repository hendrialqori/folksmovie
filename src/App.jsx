import { BrowserRouter, Routes ,Route } from "react-router-dom"
import { useEffect } from "react"
import { saveIntoLocal } from "./utils/session_guest_id"
import Home from "./pages/home"
import Detail from "./pages/detail"

export default function App (){

  useEffect(()=> {
    saveIntoLocal()
  }, []) 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  ) 
}