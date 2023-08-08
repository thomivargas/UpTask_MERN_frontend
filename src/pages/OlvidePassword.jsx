import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(email === '') {
      setAlerta({ error: true, msg: 'El email es requerido' })
      return
    }
    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`, { email })
      setAlerta({ error: false, msg: data.msg })
    } catch (error) {
      setAlerta({ error: true, msg: error.response.data.msg })
    }
  }
  return (
    <>
      <h1 className='text-sky-500 font-bold text-6xl capitalize'>Restablecer <span className='text-slate-100 '>password</span></h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form 
        className='my-10 bg-gray-900 shadow-md rounded-lg px-10 py-5'
        onSubmit={handleSubmit}
      >
        <div className='p-5'>
          <label 
            className='block mb-2 text-white font-semibold' 
            htmlFor='email'
          >
            Email
          </label>
          <input 
            className='bg-gray-800 border border-gray-700 p-3 rounded-xl w-full  focus:outline-none focus:border-sky-500 mt-2' 
            type='email' 
            name='email' 
            id='email' 
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='example@example.com' 
          />
        </div>
        <div className='p-5'>
          <input
            className='bg-sky-600 uppercase text-white font-bold p-3 rounded-md w-full hover:bg-sky-700 mb-1 transition duration-300 ease-in-out cursor-pointer'
            type='submit'
            value='enviar token'
          />
        </div>
        <nav className="px-5">
          <ul className='lg:flex lg:justify-between'>
            <Link to='/' className='block text-center text-gray-500 hover:text-gray-400'>
              Iniciar Sesion
            </Link>
          </ul>
        </nav>
      </form>
    </>
  )
}

export default OlvidePassword
