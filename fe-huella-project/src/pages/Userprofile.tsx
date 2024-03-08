import { useState, useEffect } from "react";
import { DogCard } from "../components/DogCard";
import userimg from "../assets/User001 (1).png" ;
import { DogCreateCard } from "../components/DogCreateCard";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
// import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";

import { useAuth } from "../components/AuthContext";




interface RegisterFormValues {
  id:string;
  pets:{
    id: string,
        name: string,
        race: string,
        type: string,
        photo: string,
        location: string,
        gender: string,
        lostOrFound: string,
        userId: string,
        necklace:boolean,
        weight: number,
        age: number,
        when: string,
        createdAt: string
  }
  username: string;
  password: string;
  phone: string;
  profilePic: File;
  location: string;
  email: string;
}



export const Userprofile = () => {



  const { register, handleSubmit,  } = useForm<RegisterFormValues>();



  const { user } = useAuth();
  
  const [userData , setUserdata] = useState <RegisterFormValues>()  //datos del usuario 

  useEffect(() => {
   

    const fetchUserData = async () => {  //trae el usario 
      try {
        await axios.get(
          `https://apihuellapptest.up.railway.app/api/users/${user.id}`,

          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        ).then((res)=>{
          setUserdata(res.data)



        })
      } catch (error) {
        console.error("Error al obtener datos del usuario: ", error);
      }
    };


    fetchUserData();

  }, [[]]);



  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {

    //   const file = data.profilePic[0]   
    //  console.log(file)

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("profilePic", data.profilePic);
    formData.append("location", data.location);
    formData.append("email", data.email);
    
  
    try {
     await axios.put(
        `https://apihuellapptest.up.railway.app/api/users/update/`,
        formData,
        {
          // withCredentials:true,
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data", // Asegúrate de establecer el tipo de contenido como multipart/form-data
          },
        }
      ).then((res)=>{
        console.log(res.data);
        console.log("usuario modificado con éxito : " , userData);
      })
  
   
      
      // navigate("/userprofile");
        
     

    } catch (error) {
      console.error("Error al modificar el usuarios: ", error);
      console.log("desde el error la data del form :", data)
    }
  };


  return (
    <div className=" flex">
      <div className="w-[50%]">
        <div className="m-auto   w-[12rem] h-[18rem] max-w-sm rounded-3xl overflow-hidden shadow-lg">
          <img
            className="w-full h-[60%] object-cover "
            src={userimg }
            alt="Sunset in the mountains"
          />
        </div>

        <div className="flex  w-[60%] m-auto ">
          {userData?.pets?.map((pet) => {
            return <DogCard key={pet.id} pet={pet} />;
          })}
        </div>
        <div className="m-4">
          <DogCreateCard />
        </div>
      </div>
      <div className=" w-[50%] ">
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
          <label>Nombre de usuario</label>
          <input
            type="username"
            placeholder="Nombre de usuario"
            {...register("username", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label>Celular</label>
          <input
            type="phone"
            placeholder="Teléfono"
            {...register("phone", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

           <label>Imagen de Perfil</label>
            <input type="file"  placeholder="imagen de perfil" multiple={false} {...register("profilePic", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400" /> 

{/* 
          <label htmlFor="file"></label>
          <input id="file" type="file"  multiple={false} {...register("profilePic",{required:true})} /> */}



          <label>Location</label>
          <input
            type="location"
            placeholder="location"
            {...register("location", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <button
            type="submit"
            className="inline-block m-auto text-center w-[18rem] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
           Actualizar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};
