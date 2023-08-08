import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import ModalFormTarea from "../components/ModalFormTarea"
import Tarea from "../components/Tarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import Colaborador from "../components/Colaborador"
import Alerta from "../components/Alerta"
import io from 'socket.io-client'

let socket;

const Proyecto = () => {
  const { id } = useParams();
  const { obtenerProyecto, proyecto, handleModalTarea, alerta, submitTareasProyecto, eliminarTareaProyecto, editarTareaProyecto, completarTaraeProyecto } = useProyectos();
  const admin = useAdmin();
  const { nombre, tareas } = proyecto;

  useEffect(() => {
    obtenerProyecto(id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('abrirProyecto', id);
  }, [])

  useEffect(() => {
    socket.on('tarea-agregada', tareaNueva => {
      if(tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva)
      }
    })

    socket.on('tarea-eliminada', tareaEliminada => {
      if(tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada)
      }
    })

    socket.on('tarea-editada', tareaEditada => {
      if(tareaEditada.proyecto._id === proyecto._id) {
        editarTareaProyecto(tareaEditada)
      }
    })

    socket.on('tarea-completada', tareaCompletada => {
      if(tareaCompletada.proyecto._id === proyecto._id) {
        completarTaraeProyecto(tareaCompletada)
      }
    })
  })
  
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between">
        {alerta.msg && <Alerta alerta={alerta}/>}
        <h1 className="text-3xl font-bold text-center">{nombre}</h1>
        <div className="flex gap-5 justify-center mt-5 md:mt-0">
        {admin && (
          <Link
            to={`/proyectos/editar/${id}`}
            className="flex w-36 items-center justify-center  gap-2 uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded"
          >
            Editar
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </Link>
        )}
        {admin && (
          <button
            type="button"
            className="flex w-44 items-center justify-center gap-2 uppercase bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleModalTarea}
          >
            Tarea Nueva
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
          </button>
        )}
        </div>
      </div>
      <div className="mt-12 md:px-10">
        <div className="w-full md:px-4 py-10">
          <div className="md:mx-auto w-full space-y-10">
            { tareas?.length ? (
              tareas.map((tarea) => (
                <Tarea key={tarea._id} tarea={tarea} />
              ))) : 
              (<p className="text-center my-5 p-10 text-white">No hay tareas</p>)}
          </div>
        </div>
        { admin && (
        <div> 
          <div className="flex items-center justify-between mt-2 md:mt-10 mx-5 md:mx-0">
            <p className="font-bold text-xl">Colaboradores:</p>
            <Link
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
              className="flex w-36 items-center justify-center  gap-2 uppercase bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4  rounded"
            >
              Agregar
            </Link>
          </div>
          <div className="mt-5 p-4 md:p-0">
            { proyecto.colaboradores?.length ?
              <div className="rounded-lg overflow-hidden">
                {proyecto.colaboradores?.map(colaborador => (
                  <Colaborador key={colaborador._id} colaborador={colaborador}/>))}
              </div>  : 
                <p className="text-center my-5 p-10 text-white">
                  No hay colaboradores
                </p>
            }
          </div>
        </div>
        )}
      </div>
      <ModalFormTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  )
}

export default Proyecto
