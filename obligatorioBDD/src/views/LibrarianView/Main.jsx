import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import ReservationsAvailable from "./components/reservationsAvailable";
import ManagedReservations from "./components/managedReservations";
import '../../index.css';
import { getReservationsTodayService } from '../../service/getReservationsTodayService.jsx';

export default function Main() {
    const [activeTab, setActiveTab] = useState("Reservas Disponibles");
    const [totalReservations, setTotalReservations] = useState(null);
    const [availableReservations, setAvailableReservations] = useState(null);
    const [managedReservations, setManagedReservations] = useState(null);

    useEffect(() => {
        const getReservationsToday = async () => {
            const reservationsRes = await getReservationsTodayService();
            if (reservationsRes.success) {
                setTotalReservations(reservationsRes);
                setAvailableReservations(reservationsRes);
            }
        }
        getReservationsToday();
    }, [])

    const handleNewManagedReservation = (reservationGroupId) => {
        const newManagedReservation = '';
        setAvailableReservations(availableReservations.filter((reservation) => reservation.studyGroupId !== newManagedReservation.studyGroupId));
        setManagedReservations(...managedReservations, newManagedReservation);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <NavBar />
            <section className="flex-grow flex flex-col items-start justify-center sm:px-10 py-2">
                <div className="w-full flex justify-start overflow-x-auto overflow-y-hidden mx-0">
                    {[
                        { id: "Reservas Disponibles", label: "Reservas Disponibles", icon: "fa-calendar" },
                        { id: "Reservas Gestionadas", label: "Reservas Gestionadas", icon: "fa-check" },
                        { id: "Reserva Express", label: "Reserva Express", icon: "fa-alarm-clock" },
                    ].map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                          className={`cursor-pointer relative z-30 border-b-white -mb-[4px] px-6 py-3 text-lg font-medium transition-all duration-200 rounded-t-2xl border ${activeTab === tab.id ? "bg-white border-gray-300 border-b-white text-[#052e66] " : "bg-gray-200 border-transparent text-gray-600 hover:bg-gray-200"}`}
                        >
                            <i className={`fa-solid ${tab.icon} mr-2`}></i>
                            <span className="hidden lg:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="w-full sm:max-w-9xl bg-white border border-gray-300 rounded-b-2xl rounded-tr-2xl shadow-md flex flex-col h-[70vh] relative z-10">
                    <div className="sm:p-8 p-4 text-gray-700 text-lg overflow-y-auto scrollbar">
                        {activeTab === "Reservas Disponibles" && <ReservationsAvailable /> }
                        {activeTab === "Reservas Gestionadas" && <ManagedReservations /> }
                        {activeTab === "Reserva Express" && <div className="animate-fadeIn"><p>Reserva Express</p></div>}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
