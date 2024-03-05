
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import dogCreate from "../assets/imagecreatePet.png";
import { useAuth } from "../components/AuthContext";
import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';


interface CreateFormValues {
    name: string;
    race: string;
    type: string;
    image: File,
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
  const { user } = useAuth(); // Verificar si el usuario tiene el accessToken al cargar el componente 
  useEffect(() => { if (!user.accessToken) { navigate("/login"); // Redirigir al usuario a la página de login si no tiene accessToken 
} }, [user.accessToken , navigate]);


  const { mutate } = useMutation(
    async (data: CreateFormValues) => {
  
      const response = await axios.post("https://apihuellapptest.up.railway.app/api/pets/create", data, {
        headers: {
            Authorization: Bearer ${user.accessToken}
        }
    });
   
      console.log(response.data);
    }
  );




  const onSubmit: SubmitHandler<CreateFormValues> = (data) => {
    if (isNaN(new Date(data.when).getTime())) {
      console.error("Fecha invalida en el campo 'when'. Por favor, proporciona una fecha válida.");
      return;
    }
    mutate(data, {
      onSuccess: () => {
        console.log("Mascota creada con éxito");
        navigate("/");
      },
      onError: (error) => {
        console.error("Error al crear la mascota: ", error);
      },
    });
  };

  const [uploadedFile, setUploadedFile] = useState('');

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    
    // Agregar los campos del formulario al FormData
    formData.append('name', ("name"));
    formData.append('race', ("race"));
    formData.append('type', ("type"));
    formData.append('location', ("location"));
    formData.append('gender', ("gender"));
    formData.append('lostOrFound', ("lostOrFound"));
    formData.append('necklace', ("necklace"));
    formData.append('weight', ("weight"));
    formData.append('age', ("age"));
    formData.append('when', ("when"));
    
    formData.append('image', file);
     // Subir archivo al servidor
      axios.post('https://apihuellapptest.up.railway.app/api/pets/create', formData, {
        headers: {
            Authorization: Bearer ${user.accessToken}
        }
    })
    .then((response) => {
          const imageUrl = response.data.url; // Obtener la URL de la imagen subida
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




          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "50px" }}>
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
           
               <label>photo</label>
    <div {...getRootProps()} style={{ border: '1px solid black', padding: '20px', margin: '20px 0' }}>
                    <input {...getInputProps()} placeholder="imagen photo mascota"{...register("image", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
                    <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionarla.</p>
                </div>
                {uploadedFile && <img src={uploadedFile} alt="uploaded" />}


            {/* <input type="photo" placeholder="imagen photo perfil"  {...register("photo", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
            */}
            {/* <label>Imagen de la mascota</label> */}
            

            <button type="submit" className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0" style={{ marginTop: "15px", textAlign: "center" }}>
              Registrar Perfil
            </button>
          </form>
        </div>
      </div>
  );
};
