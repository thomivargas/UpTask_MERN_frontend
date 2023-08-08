import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"


const FormColaborador = () => {
    const [email, setEmail] = useState('')
    const { alerta, mostrarAlerta, submitColaborador } = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()
        if(email === '') {
            mostrarAlerta({msg: 'El email es obligatorio', error: true})
            return
        }
        submitColaborador(email)
    }

  return (
    <form
        className="bg-gray-800 py-5 px-5 md:w-1/2 rounded-lg"
        onSubmit={handleSubmit}
        >
        <div>
            <label
                className="block uppercase tracking-wide text-xs font-bold mb-4"
                htmlFor="email"
                >
                Email del Colaborador
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-4 leading-tight focus:outline-none focus:bg-white"
                id="email"
                type="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="mt-4">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
            >
                Agregar
            </button>
        </div>
        {alerta.msg && <Alerta alerta={alerta} />}
    </form>
  )
}

export default FormColaborador
