
interface Props{
      pet:{
        id: string,
        name: string,
        race: string,
        type: string,
        photo: string,
        location: string,
        gender: string,
        lostOrFound: string,
        userId: string,
        necklace:boolean,
        weight: number,
        age: number,
        when: string,
        createdAt: string
      }

}

export const DogCard = ({pet} : Props ) => {
 return (
 
  <div className="m-4 w-[14rem] h-[20rem] max-w-md rounded-3xl overflow-hidden shadow-lg">
  <img className="w-full h-[60%] object-cover" src={pet.photo} alt="Mascota" />
  <div className="px-6 py-4">
    <ul>
      <li>{pet.name}</li>
      <li>{pet.race}</li>
      <li>{pet.type}</li>
    </ul>
  </div>
  <Link to={`/detail/${pet.id}`}>
  <button className="bg-blue-500 text-white py-2 px-6 rounded-full">
            Ver Detalle
          </button>
  </Link>
</div>
);
};
