import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import perroqueladra from "../assets/PerroQueLadraAl404.png"

export const Error: React.FC  = () => {
  return (
   
    <main className="bg-gradient-to-t from-[#dbe4ee]  flex flex-col min-h-[100vh] ">
      
    <Navbar/>
    
    <div className=" mt-10 flex justify-center p-[6rem]">
        
        <div className="w-[50%]">
            <img className="m-auto w-[30rem] h-[25rem]" src={perroqueladra} alt="" />
        </div>
     
       <div className=" flex flex-col  h-[30rem] w-[50%] ">
            <h1 className="font-bold text-6xl" >404 Not Found  <span className=" text-orange-huella">¡ups!</span></h1>
            <br />
            <p>No te preocupes, revisá la dirección web o contactá a los administradores.</p>
       </div>
        
    
    
    </div>
  
    <Footer></Footer>
    </main>
    
    
  )
}
