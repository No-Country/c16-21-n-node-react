import { Link } from "react-router-dom";
import LogoHuella from "../assets/LogoHuella.png";
import { HomeLists } from "../components/HomeLists";

export const Home = () => {

  return (
    <div>
      <section className="flex flex-col justify-center">
        <div className="pl-20 pr-20 flex justify-center">
      
          <img
            className="w-[80%] mt-20"
            src={LogoHuella}
            alt="img presentacion"
          />
        </div>

        <div className="mb-5">

          <p className=" m-auto text-center  flex flex-col  text-5xl font-bold font- mt-4">
            encontra a tus macotas,
            <span className="text-orange-huella">Rapido</span>
          </p>

        </div>


        <Link
          className=" inline-block m-auto text-center  w-[25%] rounded-full h-10  mr-auto  shadow-md shadow-gray-400   text-sm px-4 py-3 leading-none text-white bg-blue-buttons  hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-4 lg:mt-0"
          to={"/register"}
        >
         
          Crea Tu Cuenta
        </Link>
        


      </section>

      <HomeLists >
        
      </HomeLists>


    </div>
  );
};