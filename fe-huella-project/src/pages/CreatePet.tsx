import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
// import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import dogCreate from "../assets/imagecreatePet.png";
import { useAuth } from "../components/AuthContext";
import { useEffect, useState } from "react";
 import { useDropzone } from 'react-dropzone';

interface CreateFormValues {
  name: string;
    race: string;
    type: string;
    image: string,
  location: string;
  gender: string;
  lostOrFound:string;
 necklace: boolean;
    weight: number;
    age: number;
    when: string;
}
export const CreatePet: React.FC = () => {
  const { register ,handleSubmit } = useForm<CreateFormValues>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

   // Verificar si el usuario tiene el accessToken al cargar el componente
  useEffect(() => { if (!user.accessToken) { navigate("/login"); // Redirigir al usuario a la página de login si no tiene accessToken
} }, [user.accessToken , navigate]);

const onSubmit: SubmitHandler<CreateFormValues> =(data) => {
 
  const formData = new FormData();

    formData.append("name", data.name);
    formData.append("race", data.race);
    formData.append("type", data.type);
    formData.append("location", data.location);
    formData.append("gender", data.gender);
    formData.append("lostOrFound", data.lostOrFound);
    formData.append("necklace", String(data.necklace));
    formData.append("weight", String(data.weight));
    formData.append("age", String(data.age));
    formData.append("when", data.when);
    formData.append("image", data.image);

    axios
    .post("https://apihuellapptest.up.railway.app/api/pets/create", formData, {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
    .then((response) => {
      console.log("Mascota creada con éxito", response.data);
      navigate("/");
    })
    .catch((error) => {
      console.error("Error al crear la mascota:", error);
    });
};

const onDrop = (acceptedFiles: File[]) => {
  
  const file = acceptedFiles[0];
  const formData = new FormData();
  
  formData.append("image", file);

  axios.post('https://apihuellapptest.up.railway.app/api/pets/create', formData,
  
  
  
  {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  })
    .then((response) => {
      const imageUrl = response.data.url;
      setUploadedFile(imageUrl);
    }).catch((error) => {
      console.error('Error al subir la imagen: ', error);
    });
};

const { getRootProps, getInputProps } = useDropzone({ onDrop });




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


<form onSubmit={handleSubmit(onSubmit)}
           style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "50px" }}>
            <label>Nombre </label>
            <input type="name" placeholder="Nombre de usuario" {...register("name", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
            <label>race</label>
            <input type="race" placeholder="Teléfono" {...register("race", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />




            <label>type</label>
            <input type="type" placeholder="type" {...register("type", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
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
            <input type="date" placeholder="when" {...register("when", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
           



            <div {...getRootProps()} style={{ border: '2px dashed #333', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
            Arrastra y suelta una imagen aquí, o haz clic para seleccionar un archivo
          </div>
          <label>image</label>
          <input {...getInputProps()} placeholder="imagen photo mascota" {...register("image", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
          {uploadedFile && <img src={uploadedFile} alt="uploaded" />}



            <button type="submit" className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0" style={{ marginTop: "15px", textAlign: "center" }}>
              Registrar Perfil
            </button>
          </form>
        </div>
      </div>
  );
};
