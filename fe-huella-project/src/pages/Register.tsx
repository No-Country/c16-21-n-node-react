import DalmataRegister from "../assets/dalmataRegister.png";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


interface RegisterFormValues {
  username: string;
  password: string;
  phone: string;
  // profilePic?: string; // Hacer profilePic opcional con el operador "?"
  location: string;
  email: string;
 
}


export const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const navigate = useNavigate();


  const { mutate } = useMutation(
    async (data: RegisterFormValues) => {
      const response = await axios.post("https://apihuellapptest.up.railway.app/api/users/signin", data);
      console.log(response.data);
    }
  );
 
 // defino una función onSubmit que se ejecuta cuando se envía el formulario. Dentro de esta función se llama a la función mutate del hook useMutation para hacer una petición POST a un endpoint de la API. Si la petición es exitosa, se muestra un mensaje de "Registro exitoso" y se redirige al usuario a la página principal. En caso de error, se muestra un mensaje de error en la consola.
  // La función mutate se utiliza en este código para enviar una solicitud de registro de usuario a la API utilizando el método POST de axios. Cuando se llama a la función mutate, se pasa el objeto de datos del formulario (data) como argumento, junto con un objeto de configuración que incluye dos propiedades: onSuccess y onError.


  // La propiedad onSuccess se ejecuta si la solicitud de registro es exitosa, imprime "Registro exitoso" en la consola y navega al inicio ("/").
  // La propiedad onError se ejecuta si hay algún error en la solicitud de registro, mostrando un mensaje de error en la consola.
  // En resumen, la función mutate se utiliza para gestionar la llamada a la API para registrar un nuevo usuario, y manejar tanto eventos exitosos como errores de forma adecuada.
 
  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        console.log("Registro exitoso");
        navigate("/login");
      },
      onError: (error) => {
        console.error("Error en el registro: ", error);
      },
    });
  };


  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 className="text-orange-huella font-bold text-6xl py-4" style={{ textAlign: "center" }}>Crear cuenta</h1>


        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            className="w-[80%] mt-20 ml-auto"
            src={DalmataRegister}
            alt="img presentacion"
            style={{
              width: "522px",
              height: "522px",
              top: "250px",
              left: "111px",
              position: "absolute"
            }}
          />


          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "50px" }}>
            <label>Nombre de usuario</label>
            <input type="username" placeholder="Nombre de usuario" {...register("username", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            <label>Celular</label>
            <input type="phone" placeholder="Teléfono" {...register("phone", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            <label>Email</label>
            <input type="email" placeholder="Email" {...register("email", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            {/* <label>Imagen de Perfil</label>
            <input type="profilePic" placeholder="imagen de perfil"  {...register("profilePic")} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" /> */}


            <label>Locacion</label>
            <input type="location" placeholder="location" {...register("location", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
            <label>Contraseña</label>
            <input type="password" placeholder="Contraseña"  {...register("password", { required: true })}className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            <button type="submit" className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0" style={{ marginTop: "15px", textAlign: "center" }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


















// import DalmataRegister from "../assets/dalmataRegister.png";
// import { useForm, SubmitHandler } from "react-hook-form";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";


// interface RegisterFormValues {
//   username: string;
//   password: string;
//   phone: string;
//   image: FileList,
//   location: string;
//   email: string;
 
// }


// export const Register: React.FC = () => {
//   const { register, handleSubmit } = useForm<RegisterFormValues>();
//   const navigate = useNavigate();


//   // const { mutate } = useMutation(
//   //   async (data: RegisterFormValues) => {
//   //     const response = await axios.post("https://apihuellapptest.up.railway.app/api/users/signin", data);
//   //     console.log(response.data);
//   //   }
//   // );
 
//  // defino una función onSubmit que se ejecuta cuando se envía el formulario. Dentro de esta función se llama a la función mutate del hook useMutation para hacer una petición POST a un endpoint de la API. Si la petición es exitosa, se muestra un mensaje de "Registro exitoso" y se redirige al usuario a la página principal. En caso de error, se muestra un mensaje de error en la consola.
//   // La función mutate se utiliza en este código para enviar una solicitud de registro de usuario a la API utilizando el método POST de axios. Cuando se llama a la función mutate, se pasa el objeto de datos del formulario (data) como argumento, junto con un objeto de configuración que incluye dos propiedades: onSuccess y onError.


//   // La propiedad onSuccess se ejecuta si la solicitud de registro es exitosa, imprime "Registro exitoso" en la consola y navega al inicio ("/").
//   // La propiedad onError se ejecuta si hay algún error en la solicitud de registro, mostrando un mensaje de error en la consola.
//   // En resumen, la función mutate se utiliza para gestionar la llamada a la API para registrar un nuevo usuario, y manejar tanto eventos exitosos como errores de forma adecuada.
 
//   const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
//     const file = data.image[0];
  
//     const formData = new FormData();
//     formData.append("username", data.username);
//     formData.append("password", data.password);
//     formData.append("phone", data.phone);
//     formData.append("location", data.location);
//     formData.append("image", file);
  
//     // Log FormData to check if the image is present
//     console.log("FormData:", formData);
  
//     try {
//       const response = await axios.post(
//         "https://apihuellapptest.up.railway.app/api/signin",
//         formData
//       );
  
//       console.log(response.data);
//       console.log("Registro exitoso");
//       navigate("/login");
//     } catch (error) {
//       console.error("Error al crear el usuario, ", error);
//     }
//   };



//   return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//       <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <h1 className="text-orange-huella font-bold text-6xl py-4" style={{ textAlign: "center" }}>Crear cuenta</h1>


//         <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <img
//             className="w-[80%] mt-20 ml-auto"
//             src={DalmataRegister}
//             alt="img presentacion"
//             style={{
//               width: "522px",
//               height: "522px",
//               top: "250px",
//               left: "111px",
//               position: "absolute"
//             }}
//           />


//           <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "50px" }}>
//             <label>Nombre de usuario</label>
//             <input type="username" placeholder="Nombre de usuario" {...register("username", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


//             <label>Celular</label>
//             <input type="phone" placeholder="Teléfono" {...register("phone", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


//             <label>Email</label>
//             <input type="email" placeholder="Email" {...register("email", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


//             <label htmlFor="file"></label>
//           <input id="file" type="file"  multiple={false} {...register("image",{required:true})} />


//             <label>Locacion</label>
//             <input type="location" placeholder="location" {...register("location", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
//             <label>Contraseña</label>
//             <input type="password" placeholder="Contraseña"  {...register("password", { required: true })}className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


//             <button type="submit" className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0" style={{ marginTop: "15px", textAlign: "center" }}>
//               Sign In
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
