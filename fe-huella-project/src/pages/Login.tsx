import dogLogin from "../assets/dogLogin.png";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

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
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div>
        <h1
          className="text-orange-huella font-bold text-6xl py-4"
          style={{ textAlign: "center" }}
        >
          Ingresar
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            marginTop: "50px",
          }}
        >
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-200 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
          />

          <Link to={"/rescuepassword"}>Olvidé mi contraseña</Link>

          <label>Contraseña</label>

          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
          />
          {/* <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.5099 6.50845L25.5287 5.52719C25.2514 5.24987 24.7394 5.29255 24.4194 5.67648L21.0058 9.06843C19.4697 8.40717 17.7845 8.08717 16.0138 8.08717C10.7443 8.10842 6.17926 11.1804 3.98177 15.5967C3.85373 15.874 3.85373 16.2152 3.98177 16.4499C5.00568 18.5406 6.54177 20.2686 8.46178 21.5699L5.66712 24.4072C5.34712 24.7272 5.30444 25.2391 5.51784 25.5165L6.4991 26.4977C6.77642 26.7751 7.2884 26.7324 7.6084 26.3484L26.3389 7.61793C26.7443 7.29811 26.787 6.78616 26.5097 6.50881L26.5099 6.50845ZM17.1444 12.951C16.7818 12.8656 16.3978 12.759 16.0351 12.759C14.2217 12.759 12.7712 14.2097 12.7712 16.0229C12.7712 16.3856 12.8566 16.7695 12.9632 17.1322L11.5337 18.5403C11.1071 17.7937 10.8724 16.9615 10.8724 16.023C10.8724 13.1857 13.1551 10.903 15.9925 10.903C16.9312 10.903 17.7632 11.1376 18.5098 11.5642L17.1444 12.951Z" fill="#666666" fill-opacity="0.8"/>
<path d="M28.046 15.5966C27.2994 14.1032 26.3179 12.7593 25.1021 11.6713L21.134 15.5966V16.0232C21.134 18.8605 18.8513 21.1432 16.014 21.1432H15.5874L13.0701 23.6605C14.0088 23.8525 14.9901 23.9805 15.9501 23.9805C21.2196 23.9805 25.7846 20.9086 27.9821 16.471C28.1741 16.1723 28.1741 15.8737 28.046 15.5964L28.046 15.5966Z" fill="#666666" fill-opacity="0.8"/>
</svg>
   */}

          <button
            type="submit"
            className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
            Sign In
          </button>
        </form>
        <p>¡Me equivoqué! Quiero crear una cuenta</p>
      </div>
      <img
        className="w-[80%]"
        src={dogLogin}
        alt="img presentacion"
        style={{
          position: "absolute",
          width: "781px",
          height: "586px",
          left: "659px",
          top: "111px",
        }}
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
