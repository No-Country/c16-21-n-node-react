import React, { useEffect, useState } from "react";


import perro from "../assets/dalmataRegister.png";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import { useNavigate, useParams, } from "react-router-dom";


interface petDetail {
  name: string;
  race: string;
  type: string;
  photo: string;
  location: string;
  gender: string;
  lostOrFound: string;
  // userId: string;
  necklace: boolean;
  weight: number;
  age: number;
  // when: string;
  // createdAt: string;
}


export const Detail: React.FC = () => {
  const { user } = useAuth();


  const navigate = useNavigate();
  const { id } = useParams();
  const [petDetails, setPetDetails] = useState<petDetail | null>(null);


  useEffect(() => {
      const fetchPetDetails = async () => {
          try {
              // Redirigir al usuario a la página de login si no tiene accessToken
              if (!user.accessToken) {
                  navigate("/login");
                  return;
                }
           
             
                // const petId = user.id;
                // console.log(user.id)
                // console.log(user)
               
               
                const res = await axios.get(
                    `https://apihuellapptest.up.railway.app/api/pets/details/${id}`, );
                            console.log("soy el setpet",setPetDetails)
                           
                            const petData: petDetail = res.data;
                            console.log("soy setpet",petData)
                            setPetDetails(petData);  
                                   console.log(id)
      } catch (error) {
        console.error("Error al obtener detalles de la mascota: ", error);
        // Manejar el error, por ejemplo, redirigir a una página de error
     
      }
    };


    fetchPetDetails();
  }, [user.accessToken, user.id, navigate]);


  if (!petDetails) {
    // Puedo mostrar un indicador de carga aquí si lo deseas
    return <p>Cargando detalles de la mascota...</p>;
  }


  const userEmail=user.email




  console.log(user.email)
  console.log(user)
  return (
     
      <section className="flex justify-center bg-gray-100 p-8">
      <div className="flex flex-col w-[50%] bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-orange-huella mb-4">
          Detalles de la mascota
        </h1>
        <p className="text-lg font-semibold">{petDetails.name}</p>
        <p className="text-md">Raza: {petDetails.race}</p>
   
        <div className="mt-4">
          <img src={petDetails.photo} alt="Mascota" className="w-2/3 rounded-lg" />
        </div>
   
        <p className="mt-4">Locación: {petDetails.location}</p>
        <p>Género: {petDetails.gender}</p>
        <p>{petDetails.lostOrFound}</p>
        <p>Collar: {petDetails.necklace ? 'Sí' : 'No'}</p>
        <p>Peso: {petDetails.weight}</p>
   
        <p className="mt-4">Edad: {petDetails.age}</p>
   
        {/* Agrega estilos adicionales según sea necesario para otros detalles de la mascota */}
      </div>
      <div className="w-[50] ml-4">
        {/* <img className="w-full rounded-lg" src={perro} alt="Perro" /> */}
      <img className="w-[30rem]" src={perro} alt="" />
      <button className="mt-4 bg-orange-huella text-white px-4 py-2 rounded-md" type="submit">
        <a href={`mailto:${userEmail}`} target="_blank" rel="noopener noreferrer">
          Contacta al dueño Correo Electronico:{userEmail}
        </a>
      </button>
      </div>
    </section>
 
 );
};


export default Detail;


