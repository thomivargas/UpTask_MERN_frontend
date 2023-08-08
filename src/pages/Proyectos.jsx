import PreviewProyecto from '../components/PreviewProyecto'
import useProyectos from '../hooks/useProyectos'

const Proyectos = () => {
  const { proyectos } = useProyectos()

  return (
    <>
      <h1 className='text-3xl font-bold px-5'>Proyectos</h1> 
      <div className='mt-2 md:mt-16'>
        {proyectos.length ? 
          proyectos.map(proyecto => (
             <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
         : <p className='text-center text-gray-600 uppercase '>no hay proyectos</p>}
      </div>
    </>
  )
}

export default Proyectos
