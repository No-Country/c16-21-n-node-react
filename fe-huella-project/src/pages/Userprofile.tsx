import { useState,useEffect } from "react";
import { DogCard } from "../components/DogCard"

import { DogCreateCard } from "../components/DogCreateCard";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";
import userimg from "../assets/User001 (1).png"
import { useAuth } from "../components/AuthContext";


interface pet {
    id: string;
    name: string;
    race: string;
    type: string;
    photo: string;
    location: string;
    gender: string;
    lostOrFound: string;
    userId: string;
    necklace: boolean;
    weight: number;
    age: number;
    when: string;
    createdAt: string;
  }

  interface RegisterFormValues {
    username: string;
    password: string;
    phone: string;
    profilePic: string,
    location: string;
    email: string;
   
  }

  // ac1d31db-0947-4689-943e-4fe3e87ab4dd
  export const Userprofile = () => {
    // const navigate = useNavigate();
    const [pets, setPets] = useState<Array<pet>>([]);
    const { register, handleSubmit, setValue } = useForm<RegisterFormValues>();
    const { user } = useAuth();
    console.log(user);

console.log(user.accessToken)

    useEffect(() => {
      // console.log("User context:", user);
    
      const fetchUserData = async () => {
           // Lógica para obtener y mostrar los datos del usuario.
          // solicitud GET a la API para obtener los datos del usuario
           try {
          const res = await axios.get(`https://apihuellapptest.up.railway.app/api/users/${user.id}`,
          // Extrae los datos del usuario de la respuesta
      
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
         )
          const userData = res.data;
           // Itera sobre las claves del objeto userData
          Object.keys(userData).forEach((key) => {
           // Utiliza setValue del hook useForm para establecer el valor en el campo correspondiente del formulario
            setValue(key as keyof RegisterFormValues, userData[key]);
          });
        } catch (error) {
          console.error("Error al obtener datos del usuario: ", error);
        }
      };
  
      const fetchPets = async () => {
         // Lógica para obtener y mostrar las mascotas.
        try {
          const res = await axios.get("https://apihuellapptest.up.railway.app/api/pets");
          const newArr = res.data.slice(0, 2);
          setPets(newArr);
        } catch (error) {
          console.error("Error al obtener datos de mascotas: ", error);
        }
      };
  
      fetchUserData();
      fetchPets();
    }, [user.id, setValue, setPets]);
        
    
    
    
    
    
    const { mutate } = useMutation(
      async () => {
        
          try {

          // console.log(user.id)
           console.log(user.accessToken)
          // console.log(user)
        
          const response = await axios.put
          (
            `https://apihuellapptest.up.railway.app/api/users/update`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          );            
      console.log(response.data)
        } catch (error) {
          console.error("Error en la solicitud: ", error);
        }
      }
    );

    const onSubmit: SubmitHandler<RegisterFormValues> = () => {
      mutate();
    };
  

  return (
    <div className=" flex">
        <div className="w-[50%]">
            <div className="m-auto   w-[12rem] h-[18rem] max-w-sm rounded-3xl overflow-hidden shadow-lg">
            <img className="w-full h-[60%] object-cover " src={userimg} alt="Sunset in the mountains"/>

            </div>

            <div className="flex  w-[60%] m-auto ">
            {
                pets.map((pet)=>{ return <DogCard pet={pet}/>})
            }              
            </div>
            <div className="m-4">
            <DogCreateCard/>
            </div>
           
        </div>
        <div className=" w-[50%] ">
           
           
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "50px" }}>
            <label>Nombre de usuario</label>
            <input type="username" placeholder="Nombre de usuario" {...register("username", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400" />


            <label>Celular</label>
            <input type="phone" placeholder="Teléfono" {...register("phone", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400" />


            <label>Email</label>
            <input type="email" placeholder="Email" {...register("email", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400" />


            {/* <label>Imagen de Perfil</label>
            <input type="profilePic" placeholder="imagen de perfil"  {...register("profilePic", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400" /> */}


            <label>Locacion</label>
            <input type="location" placeholder="location" {...register("location", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400" />
            <label>Contraseña</label>
            <input type="password" placeholder="Contraseña"  {...register("password", { required: true })}className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400" />


            <button type="submit" className="inline-block m-auto text-center w-[18rem] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0" style={{ marginTop: "15px", textAlign: "center" }}>
              Sign In
            </button>
          </form>

        </div>

    </div>
  )
}