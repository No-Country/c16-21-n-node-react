//import perroImagen from '../assets/perroImagen.jpg'
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

  console.log(pet)



  return (
 
    <div className=" m-4 w-[12rem] h-[18rem] max-w-sm rounded-3xl overflow-hidden shadow-lg">
      <img className="w-full h-[60%] object-cover " />
      {/* // src={perroImagen} alt="Sunset in the mountains" */}
      <div className="px-6 py-4">
        
      <ul>
          <li>{pet.name}</li>
          <li>{pet.race}</li>
          <li>{pet.type}</li>
        </ul>
      </div>
    
  </div>
    
  )
}
