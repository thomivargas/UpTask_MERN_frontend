import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from "../config/clienteAxios"

const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [passwordModificado, setPasswordModificado] = useState(false)
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const { token } = useParams()

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          error: true,
          msg: error.response.data.msg
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password !== repassword) {
      setAlerta({
        error: true,
        msg: 'Los passwords no coinciden'
      })
      return
    }
    if(password.length < 6) {
      setAlerta({
        error: true,
        msg: 'El password debe tener al menos 6 caracteres'
      })
      return
    }
    if(password.trim() === '' || repassword.trim() === '') {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
      return
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
      setAlerta({
        error: false,
        msg: data.msg
      })
      setPasswordModificado(true)
      setPassword('')
      setRepassword('')
    } catch (error) {
      setAlerta({
        error: true,
        msg: error.response.data.msg
      })
    }
  }

  return (
    <div>
      <h1 className='text-slate-100 font-bold text-6xl capitalize'>Recuperar <span className='text-sky-500'>password</span></h1>

      {alerta.msg && <Alerta alerta={alerta} />}

      {tokenValido && (<form className='my-10 bg-gray-900 shadow-md rounded-lg px-10 py-5' onSubmit={handleSubmit}>
        <div className='p-2'>
            <label
              className='block mb-2 text-white font-semibold'
              htmlFor='password'
            >
              Nuevo Password
            </label>
            <input
              className='bg-gray-800 border border-gray-700 p-3 rounded-xl w-full focus:outline-none focus:border-sky-500 mt-2'
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='nuevo password'
            />
          </div>
          <div className='p-2'>
            <label
              className='block mb-2 text-white font-semibold'
              htmlFor='repassword'
            >
              Confirmar Nuevo Password
            </label>
            <input
              className='bg-gray-800 border border-gray-700 p-3 rounded-xl w-full focus:outline-none focus:border-sky-500 mt-2'
              type='password'
              name='repassword'
              id='repassword'
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              placeholder='Confirmar nuevo password'
            />
          </div>
        <div className='p-5'>
          <input
            className='bg-sky-600 uppercase text-white font-bold p-3 rounded-md w-full hover:bg-sky-700 mb-5 transition duration-300 ease-in-out cursor-pointer'
            type='submit'
            value='guardar'
          />
        </div>
      </form>)}
      { passwordModificado && (
        <div>
          <Link to={'/'} className='block text-center my-5 text-slate-500 uppercase text-sm'>
            Iniciar Sesión
          </Link>
        </div>
      )}
    </div>
  )
}

export default NuevoPassword
