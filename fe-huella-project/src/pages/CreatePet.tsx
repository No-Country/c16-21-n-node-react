

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import dogCreate from "../assets/Perro create card .png";
import { useAuth } from "../components/AuthContext";
import { getUserFromAccessToken } from "../components/AuthContext";

interface CreateFormValues {
    name: string;
    race: string;
    type: string;
    photo: string,
  location: string;
  gender: string;
  lostOrFound:string;
 necklace: boolean;
    weight: number;
    age: number;
  when: string;
}



export const CreatePet: React.FC = () => {
  const { register, handleSubmit } = useForm<CreateFormValues>();
  const navigate = useNavigate();


  const { user } = useAuth();
  const authenticatedUser = getUserFromAccessToken(user.accessToken);

  
  const { mutate } = useMutation(
    async (data: CreateFormValues) => {
      const response = await axios.post("https://apihuellapptest.up.railway.app/api/pets", data, {
        headers: {
            Authorization: `Bearer ${user.accessToken}`
        }
    });
    
      console.log(response.data);
    }
  );

  const onSubmit: SubmitHandler<CreateFormValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        console.log("Mascota creada con éxito");
        navigate("/login");
      },
      onError: (error) => {
        console.error("Error al crear la mascota: ", error);
      },
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className="text-black font-bold text-6xl py-4" style={{ textAlign: "center" }}>Nueva <span className="text-orange-huella">Mascota!</span></h1>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <img
        className="w-[80%]"
        src={dogCreate}
        alt="img presentacion create"
        style={{
            position: "absolute",
            width: " 349.86px",
            height: "360px",
            left: "56px",
            top: " 270px"
        }}
    />
</div>

{/* Subir fotografías en la que el rostro del perro sea visible, hasta X MB */}

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "50px" }}>
            <label>Nombre </label>
            <input type="name" placeholder="Nombre de usuario" {...register("name", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            <label>race</label>
            <input type="race" placeholder="Teléfono" {...register("race", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            <label>type</label>
            <input type="type" placeholder="type" {...register("type", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            <label>photo</label>
            <input type="photo" placeholder="imagen photo perfil"  {...register("photo", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />

            {/* <button type="submit" className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0 button-registrar" style={{ marginTop: "15px", textAlign: "center", left: "56px" }}>
  Registrar como perdido
</button> */}

    
{/* position: absolute;
width: 349.86px;
height: 380px;
left: 192px;
top: 317px;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */}


            <label>Locacion</label>
            <input type="location" placeholder="location" {...register("location", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
          
            <label>gender</label>
            <input type="gender" placeholder="gender"  {...register("gender", { required: true })}className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />

            <label>lostOrFound</label>
            <input type="lostOrFound" placeholder="lostOrFound" {...register("lostOrFound", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            <label>necklace</label>
            <input type="necklace" placeholder="necklace" {...register("necklace", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            <label>weight</label>
            <input type="weight" placeholder="weight"  {...register("weight", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />


            <label>age</label>
            <input type="age" placeholder="age" {...register("age", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
            <label>when</label>
            <input type="date" placeholder="when"  {...register("when", { required: true })}className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />



            <button type="submit" className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0" style={{ marginTop: "15px", textAlign: "center" }}>
              Registrar Perfil
            </button>
          </form>
        </div>
      </div>

  );
};
