import dogCreate from "../assets/Perro create card .png";
import { Link } from "react-router-dom";

export const DogCreateCard = () => {
  return (
    <Link className=" m-auto w-[15rem]  block " to="/create"> 
        
  
        <img
          className=" w-[100%]"
          src={dogCreate}
          alt="img presentacion create"
        />
   
    </Link>
  );
};
