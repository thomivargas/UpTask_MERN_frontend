import FormularioProyecto from '../components/FormularioProyecto';
import useProyectos from '../hooks/useProyectos';

const NuevoProyecto = () => {
  const {} = useProyectos();

  return (
    <>
      <h1 className='text-3xl text-center font-bold'>Crear Proyecto</h1>
      <div className='mt-10 flex md:justify-center'>
        <FormularioProyecto />
      </div>
    </>
  )
}

export default NuevoProyecto
