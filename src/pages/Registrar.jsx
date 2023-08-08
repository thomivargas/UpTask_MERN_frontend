import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || repassword.trim() === ''){
      setAlerta({msg: 'Todos los campos son obligatorios', error: true})
      return
    }
    if(password.length < 6){
      setAlerta({msg: 'La contraseña debe tener al menos 6 caracteres', error: true})
      return
    }
    if(password !== repassword){
      setAlerta({msg: 'Las contraseñas no coinciden', error: true})
      return
    }
    setAlerta({})

    // Registrar usuario en la API

    try {
      const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password})
      setAlerta({msg: data.msg, error: false})
      setNombre('')
      setEmail('')
      setPassword('')
      setRepassword('')
    } catch(error){
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }

  return (
    <div>
      <h1 className='text-sky-500 font-bold text-5xl capitalize'>crea tu cuenta y administra tus <span className='text-slate-100 '>proyectos</span></h1>
      { alerta.msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit} className='my-5 bg-gray-900 shadow-md rounded-lg px-10 py-5'>
        <div className='p-2'>
          <label 
            className='block mb-2 text-white font-semibold' 
            htmlFor='nombre'
          >
            Nombre
          </label>
          <input 
            className='bg-gray-800 border border-gray-700 p-3 rounded-xl w-full  focus:outline-none focus:border-sky-500 mt-2' 
            type='text' 
            name='nombre' 
            id='nombre' 
            placeholder='Nombre' 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className='p-2'>
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
            placeholder='example@example.com' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='p-2'>
          <label
            className='block mb-2 text-white font-semibold'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='bg-gray-800 border border-gray-700 p-3 rounded-xl w-full focus:outline-none focus:border-sky-500 mt-2'
            type='password'
            name='password'
            id='password'
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='p-2'>
          <label
            className='block mb-2 text-white font-semibold'
            htmlFor='repassword'
          >
            Confirmar Password
          </label>
          <input
            className='bg-gray-800 border border-gray-700 p-3 rounded-xl w-full focus:outline-none focus:border-sky-500 mt-2'
            type='password'
            name='repassword'
            id='repassword'
            placeholder='********'
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
        </div>
        <div className='p-2'>
          <input
            className='bg-sky-600 uppercase text-white font-bold p-3 rounded-md w-full hover:bg-sky-700 my-2 transition duration-300 ease-in-out cursor-pointer'
            type='submit'
            value='Crear cuenta'
          />
        </div>
        <nav className='px-2'>
          <ul className='lg:flex lg:justify-between'>
            <Link to='/' className='block text-center text-gray-500 hover:text-gray-400'>
              Iniciar Sesion 
            </Link>
          </ul>
        </nav>
      </form>
    </div>
  )
}

export default Registrar
