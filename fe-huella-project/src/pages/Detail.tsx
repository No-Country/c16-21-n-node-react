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
  userId: string;
  necklace: boolean;
  weight: number;
  age: number;
  when: string;
  createdAt: string;
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
                    `https://apihuellapptest.up.railway.app/api/pets/${id}`,
                    //   {
                        //     headers: {
                            //       WidthCredential: true,
                            //     },
                            //   }
                            // {
                            //     headers: {
                            //         Authorization: `Bearer ${user.accessToken}`,
                            //     },
                            // }
                            );
                            console.log("soy el setpet",setPetDetails)
                            
                            const petData: petDetail = res.data;
                            console.log("soy setpet",petData)
                            setPetDetails(petData);
      } catch (error) {
        console.error("Error al obtener detalles de la mascota: ", error);
        // Manejar el error, por ejemplo, redirigir a una página de error
        navigate("/error");
      }
    };

    fetchPetDetails();
  }, [user.accessToken, user.id, navigate]);

  if (!petDetails) {
    // Puedo mostrar un indicador de carga aquí si lo deseas
    return <p>Cargando detalles de la mascota...</p>;
  }

  return (
    <section className="flex justify-center">
      <div className="flex flex-col w-[50%]">
        <h1 className="text-4xl font-bold text-orange-huella">
          Detalles de la mascota
        </h1>
        <p>{petDetails.name}</p>
        <p>{petDetails.race}</p>
        <p>{petDetails.type}</p>
        <p>{petDetails.name}</p>
        <p>{petDetails.name}</p>
        <p>{petDetails.name}</p>
        <p>{petDetails.name}</p>
    
    
        {/* location: string;
  gender: string;
  lostOrFound: string;
  userId: string;
  necklace: boolean;
  weight: number;
  age: number;
  when: string; */}
        {/* Otros detalles de la mascota */}
      </div>
      <div className="w-[50] ">
        <img className="w-[30rem]" src={perro} alt="" />
        <button type="submit">Contacta al dueño {} </button>    
      </div>
    </section>
 
 );
};

export default Detail;
