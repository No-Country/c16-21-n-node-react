import doggies from "../assets/AboutUs.png"


export const About = () => {
  return (
    <section className="flex h-[74.3vh] justify-center ">

      <div className=" flex justify-center align-center   w-[50%] p-10">
      <img className="m-auto w-[35rem] h-[25rem] " src={doggies} alt="perros" />
        
      </div>
      <div className="  w-[50%] m-auto  ">
        <div className="">

        <h1 className="font-bold text-7xl"> Sobre  <span className=" text-orange-huella">Nosotros</span>  </h1>
        <p className="font-semibold mt-6 w-[80%]  text-xl ">Buscamos solucionar el problema de los propietarios que extraviaron a sus perros, de forma rápida y efectiva.
        <br />
        <br />
        La web proporciona una plataforma donde los propietarios pueden publicar avisos detallados sobre sus mascotas perdidas, incluyendo fotografías y detalles relevantes.Los usuarios también pueden publicar perros encontrados.
        <br />
        <br />
        Sabemos que el tiempo es clave en este tipo de búsquedas
        ¡Cada segundo cuenta!</p>  
      
        </div>
      </div> 

      
    </section>
  )
}
