import dogLogin from "../assets/dogLogin.png";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
    // Aquí puedes realizar la lógica de autenticación con los datos del formulario
  };

  return (
    <div>
      <h1 className="text-orange-huella font-bold text-6xl py-4" style={{ width: "673px", height: "62px", top: "210px", left: "50%", transform: "translateX(-50%)", position: "absolute", fontSize: "52px", fontWeight: 800, lineHeight: "62px", letterSpacing: "0px", textAlign: "center" }}>Ingresar</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register("email", { required: true })} />
        <input type="password" placeholder="Contraseña" {...register("password", { required: true })} />
        <button type="submit" className="inline-block m-auto text-center w-[25%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0" style={{ textAlign: "center" }}>
          Log in
        </button>
      </form>

      <p>¡Me equivoqué! Quiero crear una cuenta</p>

      <img
        className="w-[80%] mt-20 ml-auto"
        src={dogLogin}
        alt="img presentacion"
        style={{ width: "781px", height: "586px", top: "111px", right: "0" }}
      />
    </div>
  );
};

















// 
// export const Login = () => {
//   return (
//     <div>
//      <div>

//      <h1 className="text-orange-huella font-bold text-6xl py-4" style={{ width: "673px", height: "62px", top: "210px", left: "50%", transform: "translateX(-50%)", position: "absolute", fontSize: "52px", fontWeight: 800, lineHeight: "62px", letterSpacing: "0px", textAlign: "center" }}>Ingresar</h1>


// </div>
// <img
//     className="w-[80%] mt-20 ml-auto"
//     src={dogLogin}
//     alt="img presentacion"
//     style={{ width: "781px", height: "586px", top: "111px", right: "0" }}
// />


//    <>
  
//      {/* width: Hug (592px)
// height: Hug (1,065px)
// top: 264px
// left: 747px
// gap: 40px */}
//     <div >
   
//      <button className=" inline-block m-auto text-center  w-[25%] rounded-full h-10  mr-auto  shadow-md shadow-gray-400   text-sm px-4 py-3 leading-none text-white bg-blue-buttons  hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0" style={{textAlign: "center"  }} >
//           Log in</button>
//           <p>¡Me equivoque! Quiero crear una cuenta</p>
//      </div> 
//       </>
//  </div>
//   )
// }
// {/* <img
// className="w-[80%] mt-20"
// src={dogLogin}
// alt="img presentacion"

// //     width: 781px
// // height: 586px
// // top: 111px
// // left: 659px */}