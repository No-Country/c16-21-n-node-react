import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

interface CreateFormValues {
  id: string;
  name: string;
  race: string;
  type: string;
  photo: string;
  location: string;
  gender: string;
  lostOrFound: string;
  necklace: boolean;
  weight: number;
  age: number;
  when: string;
}

export const Petprofile = () => {

  const { register, handleSubmit } = useForm<CreateFormValues>();

  const { mutate } = useMutation(async (data: CreateFormValues) => {
    const { id } = data;

    try {
      const response = await axios.get(
        `https://apihuellapptest.up.railway.app/api/pets/${id}`
      );

      console.log(response.data);

    } catch (error) {
      console.error("Error al obtener la mascota: ", error);
    }
  });


    

    const onSubmit: SubmitHandler<CreateFormValues> = (data) => {
        mutate(data, {
          onSuccess: () => {
            console.log("Mascota creada con exitos");
            
          },
          onError: (error) => {
            console.error("Error al crear la mascota: ", error);
          },
        });
      };





  return (
    <div className="flex">
        <div className="w-[50%] shadow-2xl">
            <div className=" m-auto overflow-hidden rounded-xl w-[18rem] h-[18rem] ">
                
                {/* <img src={fotoperro}  alt="fotodoggie" className="  object-cover  h-[85%] " /> */}
                
                
                <div className=" bg-white flex  w-[100%] h-[15%] ">
                    <img src="" alt="tuerca" />
                    <p>Modificar Foto</p>
                </div>

            </div>
        </div>
        <div className="w-[50%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[60%]"
        >
          <label className="m-auto">Nombre </label>
          <input
            type="name"
            placeholder="Nombre de usuario"
            {...register("name", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label className="m-auto">race</label>
          <input
            type="race"
            placeholder="Teléfono"
            {...register("race", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label className="m-auto">type</label>
          <input
            type="type"
            placeholder="type"
            {...register("type", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label className="m-auto">photo</label>
          <input
            type="photo"
            placeholder="imagen photo perfil"
            {...register("photo", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label className="m-auto">Locacion</label>
          <input
            type="location"
            placeholder="location"
            {...register("location", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label className="m-auto">gender</label>
          <input
            type="gender"
            placeholder="gender"
            {...register("gender", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label className="m-auto">lostOrFound</label>
          <input
            type="lostOrFound"
            placeholder="lostOrFound"
            {...register("lostOrFound", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label className="m-auto">necklace</label>
          <input
            type="necklace"
            placeholder="necklace"
            {...register("necklace", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label className="m-auto">weight</label>
          <input
            type="weight"
            placeholder="weight"
            {...register("weight", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <label className="m-auto">age</label>
          <input
            type="age"
            placeholder="age"
            {...register("age", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />
          <label className="m-auto">when</label>
          <input
            type="date"
            placeholder="when"
            {...register("when", { required: true })}
            className="w-500 h-250 p-15 pl-24 pr-302 rounded border border-gray-400"
          />

          <button
            type="submit"
            className="inline-block m-auto text-center w-[18rem] rounded-full h-10 mr-auto shadow-md shadow-gray-400 text-sm px-4 py-3 leading-none text-white bg-blue-buttons hover:border-transparent hover:shadow-none hover:text-blue-buttons hover:bg-white mt-30 lg:mt-0"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
            Registrar Perfil
          </button>
        </form>

        </div>  
        
    </div>
  )
}
