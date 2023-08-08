import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioProyecto = () => {
    const [proyectoId, setProyectoId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')
    const { id } = useParams()
    const { alerta, mostrarAlerta, submitProyecto, proyecto } = useProyectos()
    
    useEffect(() => {
        if(id) {
            setProyectoId(id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [id])

    const handleSubmit = async e => {
        e.preventDefault()
        if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({msg: 'Todos los campos son obligatorios', error: true})
            return
        }
        await submitProyecto({proyectoId, nombre, descripcion, fechaEntrega, cliente})
        setProyectoId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

    const { msg } = alerta

  return (
    <form className='bg-gray-800 py-10 w-full px-5 xl:w-1/2 md:w-5/6 lg:2/3 md:rounded-lg' onSubmit={handleSubmit}>
        {msg && <Alerta alerta={alerta}/>}
        <div className='mb-4 mt-6'>
            <label className='block text-sm font-bold mb-2' htmlFor='nombre'>Nombre Proyecto</label>
            <input
                className='shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 leading-tight bg-gray-800 focus:outline-none focus:shadow-outline focus:border-sky-500'
                id='nombre'
                type='text'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder='Nombre Proyecto'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='descripcion'>Descripción</label>
            <textarea
                className='shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 leading-tight bg-gray-800 focus:outline-none focus:shadow-outline focus:border-sky-500'
                id='descripcion'                    value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                placeholder='Descripción Proyecto'
            />
        </div>
        <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='fechaEntrega'>Fecha de Entrega</label>
            <input
                className='shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 leading-tight bg-gray-800 focus:outline-none focus:shadow-outline focus:border-sky-500'
                id='fechaEntrega'
                type='date'
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>
        <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='cliente'>Cliente</label>
            <input
                className='shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 leading-tight bg-gray-800 focus:outline-none focus:shadow-outline focus:border-sky-500'
                id='cliente'
                type='text'
                value={cliente}
                onChange={e => setCliente(e.target.value)}
                placeholder='Cliente'
            />
        </div>
        <div className='mb-2 flex justify-center'>
            <input
                type='submit'
                className='bg-sky-600 w-2/3 mt-5 p-2 text-white uppercase hover:bg-sky-700 rounded-lg cursor-pointer transition duration-500 ease-in-out'
                value={proyectoId ? 'Editar Proyecto' : 'Agregar Proyecto'}
            />
        </div>
    </form>
  )
}

export default FormularioProyecto
