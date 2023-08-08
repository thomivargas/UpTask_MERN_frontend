import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const [alerta, setAlerta] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { auth, setAuth, cargando } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(email === '' || password === '') {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
      return
    }
    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password })
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/proyectos')
    } catch (error) {
      setAlerta({
        error: true,
        msg: error.response.data.msg
      })
    }
  }
  
  return (
    <div>
      <h1 className='text-sky-500 font-bold text-6xl capitalize'>Inicia sesion y administra tus <span className='text-slate-100 '>proyectos</span></h1>
      { alerta.msg && <Alerta alerta={alerta} />}
      <form 
        className='my-10 bg-gray-900 shadow-md rounded-lg px-10 py-5'
        onSubmit={handleSubmit}
        >
        <div className='p-4'>
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
        <div className='p-4'>
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
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder='********'
          />
        </div>

        <div className='p-4'>
          <input
            className='bg-sky-600 uppercase text-white font-bold p-3 rounded-md w-full hover:bg-sky-700 mb-3 transition duration-300 ease-in-out cursor-pointer'
            type='submit'
            value='Iniciar sesion'
          />
        </div>
        <nav className='px-4'>
          <ul className='lg:flex lg:justify-between'>
            <Link to='registrar' className='block text-center text-gray-500 hover:text-gray-400'>
              Registrate
            </Link>
            <Link to='olvide-password' className='block text-center text-gray-500 hover:text-gray-400'>
              Olvidaste tu contraseña?
            </Link>
          </ul>
        </nav>
      </form>
    </div>
  )
}

export default Login
