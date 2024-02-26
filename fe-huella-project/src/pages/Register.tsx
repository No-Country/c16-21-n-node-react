import DalmataRegister from "../assets/dalmataRegister.png";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterFormValues {
  username: string;
  phone: string;
  postalCode: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  birthDate: {
    month: string;
    date: string;
    year: string;
  };
}

export const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    console.log(data);
    // Realizar la lógica de registro con los datos del formulario
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 className="text-orange-huella font-bold text-6xl py-4" style={{ textAlign: "center" }}>Crear cuenta</h1>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
  className="w-[80%] mt-20 ml-auto"
  src={DalmataRegister}
  alt="img presentacion"
  style={{
    width: "522px",
    height: "522px",
    top: "250px",
    left: "111px",
    position: "absolute"
  }}
/>


          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "50px" }}>
           <label>Nombre de usuario</label>
          
            <input type="text" placeholder="Nombre de usuario" {...register("username", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
          <label>Celular</label> 
            <input type="tel" placeholder="Teléfono" {...register("phone", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
       
            <label>Código postal</label> 
            <input type="text" placeholder="Código Postal" {...register("postalCode", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
           
            <label>Email</label> 
            <input type="email" placeholder="Email" {...register("email", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
        
            <label>Confirmar email</label> 
            <input type="email" placeholder="Confirmar Email" {...register("confirmEmail", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
           
  <label>Contraseña</label> 
            <input type="password" placeholder="Contraseña" {...register("password", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
          
          
            <label>Tu fecha de nacimiento</label> 
            <input type="date" placeholder="Fecha de Nacimiento - Mes" {...register("birthDate.month", { required: true })} className="w-500 h-250 p-15 pl-24 pr-302 rounded-12 border border-gray-400" />
        
            <button type="submit" className="inline-block m-auto text-center w-[105%] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0" style={{ marginTop: "15px" ,textAlign: "center"  }}>
              Sign In 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
