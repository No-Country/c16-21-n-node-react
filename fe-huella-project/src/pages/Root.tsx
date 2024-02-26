import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"


export const  Root = () => {
 
  return (
    <main className="bg-gradient-to-t from-[#dbe4ee]  flex flex-col min-h-[100vh] ">
      
      <Navbar/>
      
      <div className=" mt-10  ">
          
          
          <Outlet></Outlet>
      
      
      </div>
    
      <Footer></Footer>
    </main>
    
  )
}
