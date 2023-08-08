import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PreviewProyecto = ({proyecto}) => {
    const { auth } = useAuth()
    const { nombre, _id, cliente, creador } = proyecto


  return (
    <>
      <div className='border-b border-gray-500 px-5 py-5 w-full flex flex-col md:flex-row md:items-center'>
        <div>
          <h2 className='text-lg md:text-2xl uppercase font-bold'>{nombre}</h2>
          <p className='text-gray-350 mt-2'>cliente: <span className='text-sky-500'>{cliente}</span></p>
        </div>
        { auth._id !== creador && <p className='text-white ml-10 bg-green-500 font-bold px-3 py-2 rounded-xl text-center cursor-default'>Colaborador</p>}
        <div className='ml-auto'>
          <Link to={`${_id}`} className='bg-purple-500 hover:bg-purple-600 font-semibold text-white px-4 py-2 rounded-md mr-10'>Ver Proyecto</Link>
        </div>
      </div>
    </>
  )
}

export default PreviewProyecto
