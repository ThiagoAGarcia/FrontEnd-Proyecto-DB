import { useEffect, useState } from 'react'
import NavBar from '../../components/navBar'
import Footer from '../../components/footer'
import Groups from './groups.jsx'
import AvailableRooms from './availableRooms.jsx'
import getAvailableRoomsService from '../../service/getAvailableRoomsService.jsx'

export default function Main() {
  const [activeTab, setActiveTab] = useState("Grupos");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [building, setBuilding] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const getAvailableRooms = async () => {
      if (date === '' || building === '') {
        return;
      } else {
        const availableRoomsRef = await getAvailableRoomsService(building, date);
        if (availableRoomsRef.success) {
          const availableRoomsArray = availableRoomsRef.rooms;
          setAvailableRooms(availableRoomsArray);
        } else {
          setAvailableRooms([]);
        }
      }
    }

    getAvailableRooms();
  }, [building, date])

  console.log(availableRooms)

  const getAvailableRoomsParameters = (building, date) => {
    setBuilding(building);
    setDate(date);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <section className="flex-grow flex flex-col items-start justify-center sm:px-10 py-2">
        <div className="w-full flex justify-start overflow-x-auto overflow-y-hidden mx-0">
          {[
            { id: "Grupos", label: "Grupos", icon: "fa-user-group" },
            { id: "Salas disponibles", label: "Salas disponibles", icon: "fa-magnifying-glass" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer relative border-b-white -mb-[4px] px-6 py-3 text-lg font-medium transition-all duration-200 rounded-t-2xl border ${activeTab === tab.id ? "bg-white border-gray-300 border-b-white text-[#052e66] " : "bg-gray-200 border-transparent text-gray-600 hover:bg-gray-200"}`}
            >
              <i className={`fa-solid ${tab.icon} mr-2`}></i>
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="w-full sm:max-w-9xl bg-white border border-gray-300 rounded-b-2xl rounded-tr-2xl shadow-md flex flex-col h-[70vh] relative z-10">
          <div className="sm:p-8 p-4 text-gray-700 text-lg overflow-y-auto scrollbar">
            {activeTab === "Grupos" && <Groups />}
            {activeTab === "Salas disponibles" && <AvailableRooms availableRooms={availableRooms} getAvailableRoomsParameters={getAvailableRoomsParameters}/>}
          </div>
        </div>
      </section>
      <Footer />
      
    </div>
  )
}
