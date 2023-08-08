import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {

  const { auth } = useAuth()

  return (
    <aside className="md:w-1/3 xs:w-full lg:w-1/5 xl:w-1/6 px-5 py-10 bg-slate-900 md:min-h-screen">
      <p className="text-2xl text-white font-black text-center">Bienvenido <span className="text-sky-600">{auth.nombre}</span> </p>
      <nav className="mt-6">
        <ul className="flex md:flex-col md:gap-3 justify-between px-3">
          <Link
            to="/proyectos"
            className="text-white font-semibold text-lg hover:text-sky-600"
          >
            Proyectos
          </Link>
          <Link
            to="crear-proyecto"
            className="text-white font-semibold text-lg hover:text-sky-600"
          >
            Nuevo Proyecto
          </Link>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
