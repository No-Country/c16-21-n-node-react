// import { useEffect, useState } from "react";

// import axios from "axios";
// import { DogCard } from "./DogCard";

// interface pet {
//   id: string;
//   name: string;
//   race: string;
//   type: string;
//   photo: string;
//   location: string;
//   gender: string;
//   lostOrFound: string;
//   userId: string;
//   necklace: boolean;
//   weight: number;
//   age: number;
//   when: string;
//   createdAt: string;
// }

// export const HomeLists = () => {
//   const [pets, setPets] = useState<Array<pet>>([]);

//   useEffect(() => {
//     axios.get("http://localhost:3000/pets").then((res) => {
//       setPets(res.data);
//     });
    
//   }, []);

//   console.log("data del estado del componente : ", pets);

//   return (
//     <section className="mt-[10rem]  flex-col justify-center align-center p-11">

//         <div className=" flex-col justify-center ">
//           <h5 className="ml-5 font-bold">Mascotas encontradas :</h5>
//           <div className="flex">
//             {pets.map((pet) => {
//               return <DogCard pet={pet} />;
//             })}
//           </div>
//         </div>

//         <div>
//           <h5 className="ml-5 font-bold">Mascotas encontradas :</h5>
//           <div className="flex">
//             {pets.map((pet) => {
//               return <DogCard pet={pet} />;
//             })}
//           </div>
//         </div>
//     </section>
//   );
// };
