import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
// import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import dogCreate from "../assets/imagecreatePet.png";
import { useAuth } from "../components/AuthContext";
import { useEffect, useState } from "react";


interface CreateFormValues {
  name: string;
  race: string;
  type: string;
  image: FileList;
  location: string;
  gender: string;
  lostOrFound: string;
  necklace: boolean;
  weight: number;
  age: number;
  when: string;
}


export const CreatePet: React.FC = () => {
  const { register, handleSubmit } = useForm<CreateFormValues>();
  const navigate = useNavigate();
  const { user } = useAuth();


  const onSubmit: SubmitHandler<CreateFormValues> = async (data) => {
    if (isNaN(new Date(data.when).getTime())) {
      console.error(
        "Fecha invalida en el campo 'when'. Por favor, proporciona una fecha válida."
      );
      return;
    }

    const file = data.image[0];
    const formattedDate = new Date(data.when).toISOString();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("race", data.race);
    formData.append("type", data.type);
    formData.append("location", data.location);
    formData.append("gender", data.gender);
    formData.append("lostOrFound", data.lostOrFound);
    formData.append("necklace", data.necklace.toString());
    formData.append("weight", data.weight.toString());
    formData.append("age", data.age.toString());
    formData.append("when", formattedDate );
    formData.append("image", file); // Solo se envía el archivo
  
    try {
      const response = await axios.post(
        "https://apihuellapptest.up.railway.app/api/pets/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data", // Asegúrate de establecer el tipo de contenido como multipart/form-data
          },
        }
      );
  
      console.log(response.data);
      console.log("Mascota creada con éxito");
      navigate("/");

        console.log(data)

    } catch (error) {
      console.error("Error al crear la mascota: ", error);
      console.log(data)
    }
  };



  //esto es tanto de razas y localidades, para realizar el select con las apis
const [races, setRaces] = useState<string[]>([]);

// antes del return
useEffect(() => {
  const fetchRaces = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const { message } = await response.json();
      const allRaces = Object.keys(message).sort();
      setRaces(allRaces);
    } catch (error) {
      console.error('Error al obtener las razas:', error);
    }
  };

  fetchRaces();
}, []);

const [locations, setLocations] = useState<string[]>([]);
// Define tipos para las respuestas de la API de localidades
interface LocationApiResponse {
  localidades: {
    nombre: string;
  }[];
}
// Agrega dentro del componente, antes del return
// En el useEffect para localidades
const fetchLocations = async () => {
  try {
    const response = await fetch(
      'https://apis.datos.gob.ar/georef/api/localidades?max=4037'
    );

    const { localidades }: LocationApiResponse = await response.json();
    const nombres = localidades.map((objeto) => objeto.nombre).sort();
    const nombresOrdenados = [...nombres].filter(
      (nombre, index, array) => array.indexOf(nombre) === index
    );
    setLocations(nombresOrdenados);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};
// Llama a fetchLocations al menos una vez
useEffect(() => {
  fetchLocations();
}, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          className="text-black font-bold text-6xl py-4"
          style={{ textAlign: "center" }}
        >
          Nueva <span className="text-orange-huella">Mascota!</span>
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            className="w-[80%]"
            src={dogCreate}
            alt="img presentacion create"
            style={{
              position: "absolute",
              width: " 349.86px",
              height: "360px",
              left: "56px",
              top: " 270px",
            }}
          />
        </div>

        {/* Subir fotografías en la que el rostro del perro sea visible, hasta X MB */}

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
          <label>Nombre </label>
          <input
            type="name"
            placeholder="Nombre de usuario"
            {...register("name", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
          />


          <label>race</label>
         <select
  {...register("race", { required: true })}
  className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
>
  {races.map((race) => (
    <option key={race} value={race}>
      {race}
    </option>
  ))}
</select>
          <label>type</label>
          <input
            type="type"
            placeholder="type"
            {...register("type", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
          />
          <label>Locacion</label>
          <select
  {...register("location", { required: true })}
  className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
>
  {locations.map((location) => (
    <option key={location} value={location}>
      {location}
    </option>
  ))}
</select>

          <label>gender</label>
          <select
  {...register("gender", { required: true })}
  className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
>
  <option value="male">Masculino</option>
  <option value="female">Femenino</option>
</select>




          <label>lostOrFound</label>
          <select
  {...register("lostOrFound", { required: true })}
  className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
>
  <option value="lost">Perdido</option>
  <option value="found">Encontrado</option>
</select>



          <label>necklace</label>
          <select
  {...register("necklace", { required: true })}
  className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
>
  <option value="true">Sí</option>
  <option value="false">No</option>
</select>

          <label>weight</label>
          <input
            type="weight"
            placeholder="weight"
            {...register("weight", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
          />

          <label>age</label>
          <input
            type="age"
            placeholder="age"
            {...register("age", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
          />

          <label>when</label>
          <input
            type="date"
            placeholder="when"
            {...register("when", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
          />

          <label htmlFor="file"></label>
          <input id="file" type="file"  multiple={false} {...register("image",{required:true})} />



          <button
            type="submit"
            className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
            Registrar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};