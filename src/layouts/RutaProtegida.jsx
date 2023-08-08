import {Outlet, Navigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const RutaProtegida = () => {
    const {auth, cargando} = useAuth();

    if(cargando) {
        return <h1>Cargando...</h1>
    }
  return (
    <>
        {auth._id ? (
          <div className='md:flex md:min-h-screen'>
            <Sidebar/>
            <div className='md:w-full'>
              <Header/>
              <main className='flex-1 md:p-10 w-full'>
                <Outlet/>
              </main>
            </div>
          </div>
        ): <Navigate to='/'/>}
    </>
  )
}

export default RutaProtegida
