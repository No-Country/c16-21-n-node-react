import dogLogin from "../assets/dogLogin.png";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}


export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { mutate } = useMutation(async (data: LoginFormValues) => {
    const response = await axios.post(
      "https://apihuellapptest.up.railway.app/api/users/login",
      data
    );
    console.log(response.data);
    const accessToken = response.data.accessToken;
    const id = response.data.user.id;
const email=response.data.user.email

    console.log(id);
    console.log(email)
    setUser({ accessToken, id ,email});
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        console.log("login con exito");
        navigate("/");
      },
      onError: (error) => {
        console.error("Error en el login: ", error);
      },
    });
  };
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div>
        <h1
          className="text-orange-huella font-bold text-6xl py-4"
          style={{ textAlign: "center" }}
        >
          Ingresar
        </h1>

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
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-200 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
          />
          <p>Olvidé mi contraseña</p>

          <label>Contraseña</label>

          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400"
          />

          <button
            type="submit"
            className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
            Sign In
          </button>
        </form>
        <p>¡Me equivoqué!</p>
        <p style={{ textDecoration: "underline" }}>
          <Link to="/register"> Quiero crear una cuenta</Link>
        </p>
      </div>
      <img
        className="w-[80%]"
        src={dogLogin}
        alt="img presentacion"
        style={{
          position: "absolute",
          width: "781px",
          height: "586px",
          left: "659px",
          top: "111px",
        }}
      />
    </div>
  );
};
