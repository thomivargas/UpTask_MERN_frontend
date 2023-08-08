import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'
let socket;

const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {
    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormTarea, setModalFormTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [tarea, setTarea] = useState({})
    const [colaborador, setColaborador] = useState({})
    const [buscador, setBuscador] = useState(false)

    const navigate = useNavigate()
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/proyectos', config)
                setProyectos(data.proyectos)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, [])

    const mostrarAlerta = (alerta) => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 3000)
    }

    const submitProyecto = async (proyecto) => {
        if(proyecto.proyectoId) { 
            await editarProyecto(proyecto) 
        } else {
            await nuevoProyecto(proyecto)
        }
        return
    }

    const editarProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.proyectoId}`, proyecto, config)
            const proyectosActualizados = proyectos.map(proyecto => proyecto._id === data._id ? data : proyecto)
            setProyectos(proyectosActualizados)
            setAlerta({msg: 'Proyecto editado correctamente', error: false})
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarProyecto = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
            const proyectosActualizados = proyectos.filter(p => p._id !== id)
            setProyectos(proyectosActualizados)
            setAlerta({msg: data.msg, error: false})

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/proyectos', proyecto, config) 
            setProyectos([...proyectos, data])
            setAlerta({msg: 'Proyecto creado correctamente', error: false})
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async (id) => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({msg: error.response.data.msg, error: true})
            setTimeout(() => {
                setAlerta({})
            }, 1000)
        } finally {
            setCargando(false)
        }
    }

    const handleModalTarea = () => {
        setModalFormTarea(!modalFormTarea)
        setTarea({})
    }

    const submitTarea = async (tarea) => {
        if(tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }
    }

    const crearTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/tareas', tarea, config)
            setAlerta({})
            setModalFormTarea(false)

            socket.emit('nueva-tarea', data.tareaAlmacenada)

        } catch (error) {  
            console.log(error)
        }
    }

    const editarTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
            
            setAlerta({})
            setModalFormTarea(false)

            socket.emit('editar-tarea', data.tareaActualizada)
            
        } catch(error) {
            console.log(error)
        }
    }

    const handleModalEditarTarea = (tarea) => {
        setTarea(tarea)
        setModalFormTarea(true)
    }

    const handleModalEliminarTarea = (tarea) => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            setModalEliminarTarea(false)
            
            socket.emit('eliminar-tarea', tarea)
            
            setTarea({})


        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async (email) => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/colaboradores`, {email}, config);
            setColaborador(data);
            setAlerta({});
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
        setCargando(false)
    }

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            setAlerta({msg: data.msg, error: false})
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 1000)
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }

    const handleModalEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(c => c._id !== colaborador._id)
            setProyecto(proyectoActualizado)
            setAlerta({msg: data.msg, error: false})
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
                setModalEliminarColaborador(false)
            }, 1000)
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }

    const completarTarea = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            
            setTarea({})
            setAlerta({})

            socket.emit('completar-tarea', data)
        } catch (error) {
            console.log(error.response)
        }
    };

    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    const submitTareasProyecto = (tarea) => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado)
    }

    const eliminarTareaProyecto = (tarea) => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(t => t._id !== tarea._id)
        setProyecto(proyectoActualizado)
    }

    const editarTareaProyecto = (tarea) => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(t => t._id === tarea._id ? tarea : t)
        setProyecto(proyectoActualizado)
    }

    const completarTaraeProyecto = (tarea) => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(t => t._id === tarea._id ? tarea : t)
        setProyecto(proyectoActualizado)
    }

    const cerrarSesionProyectos = () => {
        setProyectos([])
        setProyecto({})
        setAlerta({})
    }

    return (
        <ProyectosContext.Provider value={{
            proyectos,
            alerta,
            mostrarAlerta,
            submitProyecto,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            modalFormTarea,
            handleModalTarea,
            submitTarea,
            tarea,
            handleModalEditarTarea,
            modalEliminarTarea, 
            handleModalEliminarTarea,
            eliminarTarea,
            submitColaborador,
            colaborador,
            agregarColaborador,
            modalEliminarColaborador,
            handleModalEliminarColaborador,
            eliminarColaborador,
            completarTarea,
            handleBuscador,
            buscador,
            submitTareasProyecto,
            eliminarTareaProyecto,
            editarTareaProyecto,
            completarTaraeProyecto,
            cerrarSesionProyectos
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }
export default ProyectosContext