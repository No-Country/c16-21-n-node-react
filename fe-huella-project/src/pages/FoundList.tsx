import { useEffect, useState } from "react";
import axios from "axios";
import { DogCard } from "../components/DogCard";


interface pet {
  id: string;
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



export const FoundList = () => {
  const [pets, setPets] = useState<Array<pet>>([]);
  

  
  useEffect(() => {




    axios.get("https://apihuellapptest.up.railway.app/api/pets").then((res) => {
      const newArr = (res.data as pet[]).filter(
        (pet) => pet.lostOrFound === "found"
      );

      setPets(newArr);
    });




  }, [pets]);



  // const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const searchTerm = (event.target as HTMLFormElement).elements[0].value;
  //   console.log(searchTerm)

  //   const results = pets.filter((item) =>
  //     Object.values(item).some(
  //       (value) =>
  //         typeof value === "string" && value.includes(searchTerm)
  //     )
  //   );
  //   setPets(results);
  // };





  return (
    <div>
      <section className="flex flex-col flex-wrap justify-center">
        <h1 className=" text-center  mb-[5rem] font-bold text-5xl">
          Mascotas <span className="text-orange-huella">Encontradas</span>
        </h1>

        <div>
            {/* <form onSubmit={handleSearch}  >

            <input
                type="text"
                placeholder="Buscar..."
                name="name"
                
            />

                <button type="submit">Buscar</button>
            </form> */}
       
        </div>
        <div className="flex flex-wrap justify-center">
          {pets.map((pet) => {
            return <DogCard key={pet.id} pet={pet}></DogCard>;
          })}
        </div>
      </section>
    </div>
  );
};
