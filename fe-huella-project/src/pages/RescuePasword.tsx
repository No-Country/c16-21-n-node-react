import perro from "../assets/dalmataRegister.png"

export const RescuePasword = () => {
  return (
    <section className="flex justify-center">
      <div className="flex flex-col w-[50%]">
        <h1 className="text-4xl font-bold text-orange-huella">recuperacion de contraseña </h1>
        <p> No te procupes a todos nos paso </p>
        <form className="flex flex-col" action="">
          <label htmlFor="email"> Email</label>
          <input className="w-[20rem]" type="text" id="email" />
          <button></button>
        </form>
      </div>
      <div className="w-[50] ">
          <img className="w-[30rem]" src={perro} alt="" />
      </div>
    </section>
  )
}
