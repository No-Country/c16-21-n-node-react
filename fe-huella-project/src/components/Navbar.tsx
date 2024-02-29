import { Link } from "react-router-dom"
import LogoHuella from '../assets/LogoHuella.png'


export const Navbar = () => {
  return (
   <nav className=" p-6 flex   justify-between">
    <Link className="mt-4"  to={"/"}> <img className="w-[8rem]" src={LogoHuella} alt="logo ap" /></Link>
    
    <ul className="flex ">
      
      <li className=" mt-4 mr-6 "><Link className=" shadow-md shadow-gray-400 inline-block text-sm px-4 py-2 leading-none  rounded text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-4 lg:mt-0"  to={"/login"}>Login</Link></li>
      <li className=" mt-4 " ><Link className="  shadow-md shadow-gray-400  inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-buttons  hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-4 lg:mt-0" to={"/register"}> Sign Up</Link></li>
      <li className=" mt-4 " ><Link className="  shadow-md shadow-gray-400  inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-buttons  hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-4 lg:mt-0" to={"/create"}> Create Pet</Link></li>
      
    </ul>

   </nav>
  )
}
