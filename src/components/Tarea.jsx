import formatearFecha from "../helpers/formatearFecha"
import useAdmin from "../hooks/useAdmin"
import useProyectos from "../hooks/useProyectos"

const Tarea = ({tarea}) => {
    const { nombre, descripcion, fechaEntrega, prioridad, estado } = tarea
    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()
    const admin = useAdmin();

  return (
    <div className='bg-gray-800 rounded-lg md:mx-16 pt-2'>
      <div className='flex md:ml-5 ml-2 mb-2 justify-between'>
        <h1 className='font-semibold uppercase text-xl'>{nombre}</h1>
          <div className='flex gap-4 md:gap-10 px-2 md:px-10 items-center'>
            {admin && (
            <>
              <button 
                className='font-semibold text-sky-600 hover:text-sky-500'
                type='button'
                onClick={() => handleModalEditarTarea(tarea)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
              <button 
                className='font-semibold text-red-600 hover:text-red-500'
                type='button'
                onClick={() => handleModalEliminarTarea(tarea)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </>
            )}
              {estado ? (
              <button
                className='font-semibold text-green-600 hover:text-green-500'
                type='button'
                onClick={() => completarTarea(tarea._id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              ) : (
              <button
                className='font-semibold text-yellow-600 hover:text-yellow-500'
                type='button'
                onClick={() => completarTarea(tarea._id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button> 
              )}
          </div>
      </div>
      
      <div className='bg-gray-700 py-4 px-2 md:px-5'>
        <p className='text-gray-400 mb-2'>{descripcion}</p>
        <p className='font-bold mb-2'>Prioridad: {prioridad}</p>
        <p className='mb-2'>Entrega: {formatearFecha(fechaEntrega)}</p>
        { estado ? (
          <p className='text-green-600 font-semibold'>Completada por {tarea.completado.nombre}</p>
        ) : (
          <p className='text-yellow-600 font-semibold'>Tarea pendiente</p>
        )}
      </div>
    </div>
  )
}

export default Tarea
