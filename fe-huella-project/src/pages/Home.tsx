import { Link } from "react-router-dom";
import LogoHuella from "../assets/LogoHuella.png";
import { HomeLists } from "../components/HomeLists";
import { useAuth } from "../components/AuthContext";
import doberman from "../assets/Perro1.jpg";
import cusco from "../assets/Perro4.jpg";

export const Home = () => {
  const { user } = useAuth();

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

        {user.accessToken == "" && (
          <Link
            className=" inline-block m-auto text-center  w-[25%] rounded-full h-10  mr-auto  shadow-md shadow-gray-400   text-sm px-4 py-3 leading-none text-white bg-blue-buttons  hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-4 lg:mt-0"
            to={"/register"}
          >
            Crea Tu Cuenta
          </Link>
        )}
      </section>

      {user.accessToken == "" ? (
        <section>
          <HomeLists></HomeLists>
        </section>
      ) : (
        <section className=" flex flex-col justify-center mt-20  mb-[5rem]">
          <div className=" mb-[5rem] flex justify-around w-[100%]  ">
            <Link to="/foundedpets">
              <div className=" overflow-hidden shadow-2xl w-[25rem] rounded-3xl h-[25rem] m-[2rem]">
                <img
                  className="h-[22rem] object-cover overflow-hidden "
                  src={doberman}
                  alt=""
                />
                <div className="bg-white p-[0.5rem] h-[3rem]">
                  <p className="text-center">perros encontrados</p>
                </div>
              </div>
            </Link>
             <Link to="/lostpets">
             
              <div className=" w-[25rem] shadow-2xl rounded-3xl h-[25rem] m-[2rem] overflow-hidden ">
                <img className="h-[22rem] object-cover " src={cusco} alt="" />
                <div className="bg-white p-[0.5rem] h-[3rem] ">
                  <p className="text-center ">perros perdidos</p>
                </div>
              </div>
             </Link> 



          </div>

          <button className="  align-center m-auto inline-block  text-center  w-[25%] rounded-full h-10    shadow-md shadow-gray-400   text-sm px-4 py-3 leading-none text-white bg-blue-buttons  hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white  lg:mt-0">
            encontre una mascota perdida
          </button>

          <div>
            <h1 className=" m-10 text-center font-bold text-4xl">
              mis mascotas
            </h1>

            <div>
              <HomeLists></HomeLists>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
