import { useEffect, useState } from "react";

import axios from "axios";
import { DogCard } from "./DogCard";

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

export const HomeLists = () => {
  const [pets, setPets] = useState<Array<pet>>([]);

  useEffect(() => {
    axios.get("https://apihuellapptest.up.railway.app/api/pets").then((res) => {
      const newArr = res.data.slice(0,5)  
      setPets(newArr);
    });
    
  }, []);

 

  return (
    <section className="mt-[10rem]  flex-col justify-center align-center p-11">

        <div className=" flex-col justify-center ">
          <h5 className=" ml-[11rem] font-bold">Mascotas encontradas :</h5>
          <div className="flex justify-center">
            {pets.map((pet) => {
              return <DogCard key={pet.id} pet={pet} />;
            })}
          </div>
        </div>

        <div>
          <h5 className="ml-[11rem] font-bold">Mascotas perdidas :</h5>
          <div className="flex justify-center">
            {pets.map((pet) => {
              return <DogCard key={pet.id}  pet={pet} />;
            })}
          </div>
        </div>
    </section>
  );
};
