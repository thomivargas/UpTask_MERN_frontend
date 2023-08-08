import { useEffect } from "react"
import FormColaborador from "../components/FormColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando, colaborador,agregarColaborador } = useProyectos()
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  if(!proyecto._id) return <p>Error...</p>
  return (
    <>
        <h1 className='text-xl font-bold'>Agregar un colaborador/a</h1>
        <h2 className='text-lg font-semibold text-white mt-3 pl-3'>Proyecto: <span className="text-sky-500">{proyecto.nombre}</span></h2>
        <div className='flex justify-center mt-12 px-10'>
            <FormColaborador/>
        </div>
        {
          cargando ? <p>Cargando...</p> : colaborador?._id && (
            <div className="flex justify-center mt-10">
              <div className="w-1/2 bg-gray-800 rounded-lg py-5 px-5">
                <h1 className="text-xl font-bold text-white">Resultado:</h1>
                <div className="flex justify-between mt-3 items-center">
                  <p className="text-white font-semibold">Nombre: <span className="text-sky-500">{colaborador.nombre}</span></p>
                  <button
                    className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-white font-semibold"
                    type="button"
                    onClick={() => agregarColaborador({email: colaborador.email})}
                  >
                    Agregar al Proyecto
                  </button>
                </div>
              </div>
            </div>
          )}
    </>
  )
}

export default NuevoColaborador
