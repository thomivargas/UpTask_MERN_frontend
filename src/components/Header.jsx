import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const { handleBuscador, cerrarSesionProyectos } = useProyectos()
  const { cerrarSesionAuth } = useAuth()
  return (
    <header className="px-4 py-5">
      <div className="flex flex-col md:flex-row gap-3 md:justify-between">
          <h2 className="text-4xl text-sky-600 font-black text-center">UpTask</h2>
        <button
          type="button"
          className="bg-sky-600 text-white font-semibold text-lg hover:bg-sky-700 px-4 py-2 rounded-lg"
          onClick={ handleBuscador }
        >
          Buscar
        </button>
        <div className='flex justify-between items-center gap-4'>
          <Link 
            to="/proyectos"
            className="text-white font-semibold text-lg hover:text-sky-600"
          >
            Proyectos
          </Link>
          <button
            type="button"
            className="bg-sky-600 text-white font-semibold text-lg hover:bg-sky-700 px-4 py-2 rounded-lg"
            onClick={ () => {
              cerrarSesionProyectos()
              cerrarSesionAuth()
              localStorage.removeItem('token')
            }}
          >
            Cerrar Sesión
          </button>
          <Busqueda/>
        </div>
      </div>
    </header>
  )
}

export default Header
