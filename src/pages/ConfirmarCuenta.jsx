import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from "../config/clienteAxios"

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const { id } = useParams()
  
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/confirmar/${id}`)
        setAlerta({ error: false, msg: data.msg })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({ error: true, msg: error.response.data.msg })
      }
    }
    confirmarCuenta()
  }, [])

  const { msg } = alerta

  return (
    <>
      <h1 className='text-slate-100 font-bold text-6xl capitalize'>Confirmar <span className='text-sky-500'>cuenta</span></h1>
      <div className='bg-gray-900 mt-20 md:mt-5 shadow-md px-5 py-10 rounded-xl'>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && <Link to='/' className='text-sky-500 hover:text-sky-400 block text-center my-5 '>Iniciar sesión</Link>}
      </div>
    </>
  )
}

export default ConfirmarCuenta
