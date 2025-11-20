import {useState} from 'react'
import Footer from '../../components/footer'
import '../../index.css'
import NavBar from '../../components/navBar'
import UserView from './User'
import Estadisticas from './Estadisticas'

export default function Main() {
  const [activeTab, setActiveTab] = useState('Usuarios')

  const [roomSearch, setRoomSearch] = useState('')
  const [librarianSearch, setLibrarianSearch] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <section className="flex-grow flex flex-col items-start justify-center sm:px-10 py-2">
        <div className="w-full flex justify-start overflow-x-auto overflow-y-hidden mx-0">
          {[
            {
              id: 'Usuarios',
              label: 'Usuarios',
              icon: 'fa-regular fa-user',
            },
            {
              id: 'Salas',
              label: 'Salas',
              icon: 'fa-solid fa-people-roof',
            },
            {
              id: 'Estadisticas',
              label: 'Estadisticas',
              icon: 'fa-solid fa-chart-bar',
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer relative border-b-white -mb-[4px] px-6 py-3 text-lg font-medium transition-all duration-200 rounded-t-2xl border ${
                activeTab === tab.id
                  ? 'bg-white border-gray-300 border-b-white text-[#052e66] '
                  : 'bg-gray-200 border-transparent text-gray-600 hover:bg-gray-200'
              }`}>
              <i className={`fa-solid ${tab.icon} mr-2`}></i>
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="w-full sm:max-w-9xl bg-white border border-gray-300 rounded-b-2xl rounded-tr-2xl shadow-md flex flex-col h-[70vh] relative z-10">
          <div className="sm:p-8 p-4 text-gray-700 text-lg overflow-y-auto scrollbar">
            {activeTab === 'Usuarios' && (
              <>
                <UserView></UserView>
              </>
            )}
            {activeTab === 'Salas' && (
              <>
                <input
                  type="text"
                  className="w-full bg-white border-1 border-black rounded-full p-2 pl-5"
                  placeholder="Buscar..."
                  value={roomSearch}
                  onChange={(e) => setRoomSearch(e.target.value)}
                />
              </>
            )}

            {activeTab === 'Estadisticas' && (
              <>
                <Estadisticas></Estadisticas>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
