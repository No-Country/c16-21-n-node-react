import perroImagen from '../assets/perroImagen.jpg'

export const DogCard = () => {
  return (
 
    <div className=" w-[12rem] h-[18rem] max-w-sm rounded-3xl overflow-hidden shadow-lg">
    <img className="w-full h-[60%] object-cover " src={perroImagen} alt="Sunset in the mountains"/>
    <div className="px-6 py-4">
      
     <ul>
        <li>chihuahua</li>
        <li>negro</li>
        <li>con 4 patas</li>
      </ul>
    </div>
    
  </div>
    
  )
}
