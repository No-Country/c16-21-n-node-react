import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import dogCreate from "../assets/Perro create card .png";
import { useAuth } from "../components/AuthContext";
import { useEffect } from "react";
interface CreateFormValues {
  name: string;
  race: string;
  type: string;
  photo: string;
  location: string;
  gender: string;

}

export const CreatePet: React.FC = () => {
  const { register, handleSubmit } = useForm<CreateFormValues>();
  const navigate = useNavigate();
  const { user } = useAuth(); // Verificar si el usuario tiene el accessToken al cargar el componente 
  useEffect(() => { if (!user.accessToken) { navigate("/login"); // Redirigir al usuario a la página de login si no tiene accessToken 
} }, [user.accessToken , navigate]);

  const { mutate } = useMutation(async (data: CreateFormValues) => {
    const response = await axios.post(
      "https://apihuellapptest.up.railway.app/api/pets/create",
      data
    );
    console.log(response.data);
  });



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


        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}

  );
};