import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"


export const  Root = () => {
  return (
    <main className=" p-6 flex flex-col min-h-[100vh] ">
      
      <Navbar/>
      
      <div className=" mt-10  ">
          
          
          <Outlet></Outlet>
      
      
      </div>
    
      <Footer></Footer>
    </main>
    
  )
}