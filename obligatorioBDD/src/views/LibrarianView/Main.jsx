import {useEffect, useState} from 'react'
import NavBar from '../../components/navBar'
import Footer from '../../components/footer'
import ReservationsAvailable from './reservationsAvailable'
import ManagedReservations from './managedReservations'
import '../../index.css'
import getReservationsTodayService from '../../service/getReservationsTodayService'
import getManagedReservationsTodayService from '../../service/getManagedReservationsTodayService'
import patchManageReservationService from '../../service/patchManageReservationService'
import patchUnmanageReservationService from '../../service/patchUnmanageReservationService'
import Sanctions from './sanctions'
import getFinishedReservationsService from '../../service/getFinishedReservations'

export default function Main() {
  const [activeTab, setActiveTab] = useState('Reservas Disponibles')
  const [availableReservations, setAvailableReservations] = useState([])
  const [managedReservations, setManagedReservations] = useState([])
  const [finishedReservations, setFinishedReservations] = useState([])
  const [managing, setManaging] = useState(true)

  useEffect(() => {
    const getReservationsToday = async () => {
      const reservationsRes = await getReservationsTodayService()
      if (reservationsRes?.success) {
        let reservationArray = reservationsRes.reservations || []
        reservationArray.sort((a, b) => a.start.localeCompare(b.start))
        setAvailableReservations(reservationArray)
      } else {
        setAvailableReservations([])
      }
    }

    const getManagedReservationsToday = async () => {
      const managedReservationsRes = await getManagedReservationsTodayService()
      if (managedReservationsRes?.success) {
        let managedReservationsArray = managedReservationsRes.reservations || []
        managedReservationsArray.sort((a, b) => a.start.localeCompare(b.start))
        setManagedReservations(managedReservationsArray)
      } else {
        setManagedReservations([])
      }
    }

    const getFinishedReservationsToday = async () => {
      const finishedReservations = await getFinishedReservationsService()
      if (finishedReservations?.success) {
        let finishedReservationsArray = finishedReservations.reservations || []
        finishedReservationsArray.sort((a, b) => a.start.localeCompare(b.start))
        setFinishedReservations(finishedReservationsArray)
      } else {
        setFinishedReservations([])
      }
    }

    getReservationsToday()
    getManagedReservationsToday()
    getFinishedReservationsToday()
  }, [managing])

  const handleNewManagedReservation = async (newManagedReservation) => {
    const BODY = {
      librarian: localStorage.getItem('ci'),
      studyGroupId: newManagedReservation.studyGroupId,
    }

    const manageReservation = await patchManageReservationService(BODY)

    if (manageReservation?.success) {
      // saco de disponibles
      setAvailableReservations((prev) => {
        const updated = prev.filter(
          (availableReservation) =>
            availableReservation.studyGroupId !==
            newManagedReservation.studyGroupId
        )
        updated.sort((a, b) => a.start.localeCompare(b.start))
        return updated
      })

      // agrego a gestionadas
      setManagedReservations((prev) => {
        const updated = [...prev, newManagedReservation]
        updated.sort((a, b) => a.start.localeCompare(b.start))
        return updated
      })

      setManaging((prev) => !prev)
    }

    console.log(manageReservation)
  }

  const handleRestoreAvailableReservation = async (
    restoredAvailableReservation
  ) => {
    const BODY = {
      librarian: localStorage.getItem('ci'),
      studyGroupId: restoredAvailableReservation.studyGroupId,
    }

    const restoreReservation = await patchUnmanageReservationService(BODY)

    if (restoreReservation?.success) {
      // saco de gestionadas
      setManagedReservations((prev) => {
        const updated = prev.filter(
          (managedReservation) =>
            managedReservation.studyGroupId !==
            restoredAvailableReservation.studyGroupId
        )
        updated.sort((a, b) => a.start.localeCompare(b.start))
        return updated
      })

      // agrego a disponibles
      setAvailableReservations((prev) => {
        const updated = [...prev, restoredAvailableReservation]
        updated.sort((a, b) => a.start.localeCompare(b.start))
        return updated
      })

      setManaging((prev) => !prev)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <section className="flex-grow flex flex-col items-start justify-center sm:px-10 py-2">
        <div className="w-full flex justify-start overflow-x-auto overflow-y-hidden mx-0">
          {[
            {
              id: 'Reservas Disponibles',
              label: 'Reservas Disponibles',
              icon: 'fa-calendar',
            },
            {
              id: 'Reservas Gestionadas',
              label: 'Reservas Gestionadas',
              icon: 'fa-check',
            },
            {
              id: 'Reserva Express',
              label: 'Reserva Express',
              icon: 'fa-alarm-clock',
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer relative z-30 border-b-white -mb-[4px] px-6 py-3 text-lg font-medium transition-all duration-200 rounded-t-2xl border ${
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
            {activeTab === 'Reservas Disponibles' && (
              <ReservationsAvailable
                reservationsToday={availableReservations}
                handleNewManagedReservation={handleNewManagedReservation}
              />
            )}

            {activeTab === 'Reservas Gestionadas' && (
              <ManagedReservations
                managedReservations={managedReservations}
                handleRestoreAvailableReservation={
                  handleRestoreAvailableReservation
                }
              />
            )}

            {activeTab === 'Reserva Express' && (
              <div className="animate-fadeIn">
                <p>Reserva Express</p>
              </div>
            )}

            {activeTab === 'Sanciones' && (
              <Sanctions finishedReservations={finishedReservations}/>
            )}
          </div>
        </div>
      </section>

      {/* Debug opcional para ver qué llega */}
      {managedReservations &&
        managedReservations.map((reservation) => (
          <p key={`managed-${reservation.studyGroupId}`}>
            {`${reservation.assignedLibrarian} ${reservation.studyGroupId}`}
          </p>
        ))}

      {availableReservations &&
        availableReservations.map((reservation) => (
          <p key={`available-${reservation.studyGroupId}`}>
            {`${reservation.assignedLibrarian} ${reservation.studyGroupId}`}
          </p>
        ))}

      <Footer />
    </div>
  )
}
