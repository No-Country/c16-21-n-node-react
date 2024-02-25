
import DalmataRegister from "../assets/dalmataRegister.png";
export const Register = () => {
  return (
    <div>Register
    <img
    className="w-[40%] mt-20"
    src={DalmataRegister}
    alt="img presentacion"
  />
 <>
     <div className=" inline-block m-auto text-center  w-[25%] rounded-full h-10  mr-auto  shadow-md shadow-gray-400   text-sm px-4 py-3 leading-none text-white bg-blue-buttons  hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0">
 
     <button>
          Sign Up</button>
     </div> 
      </>
 </div>
    
  )
}
