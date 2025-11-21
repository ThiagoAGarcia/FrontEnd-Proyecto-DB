import CantidadReservasAlumnosYProfesores from './consultas/CantidadReservasAlumnosYProfesores'
import CantidadSancionesProfesoresYAlumnos from './consultas/CantidadSancionesProfesoresYAlumnos'
import PorcentajeDeOcupacionPorSala from './consultas/PorcentajeDeOcupacionPorSala'
import PorcentajeReservasEfectivasYNoEfectivas from './consultas/porcentajeReservasEfectivasYNoEfectivas'
import PromedioPorSalas from './consultas/PromediosPorSalas'
import ReservacionesPorCarreraYFacultad from './consultas/ReservacionesPorCarreraYFacultad'
import SalasMasReservadas from './consultas/SalasMasReservadas'
import TurnosMasDemandados from './consultas/TurnosMasDemandadas'

const Estadisticas = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full bg-white shadow-inner rounded-2xl p-4 flex flex-col border-2 border-gray-300">
          <SalasMasReservadas />
        </div>

        <div className="w-full bg-white shadow-inner rounded-2xl p-4 flex flex-col border-2 border-gray-300">
          <TurnosMasDemandados />
        </div>

        <div className="w-full bg-white shadow-inner rounded-2xl p-4 flex flex-col border-2 border-gray-300">
          <PromedioPorSalas />
        </div>
        
        <div className="w-full bg-white shadow-inner rounded-2xl p-4 flex flex-col border-2 border-gray-300">
          <ReservacionesPorCarreraYFacultad />
        </div>
        
        <div className="w-full bg-white shadow-inner rounded-2xl p-4 flex flex-col border-2 border-gray-300">
          <PorcentajeDeOcupacionPorSala />
        </div>
        
        <div className="w-full bg-white shadow-inner rounded-2xl p-4 flex flex-col border-2 border-gray-300">
          <CantidadReservasAlumnosYProfesores />
        </div>
        
        <div className="w-full bg-white shadow-inner rounded-2xl p-4 flex flex-col border-2 border-gray-300">
          <CantidadSancionesProfesoresYAlumnos />
        </div>
        
        <div className="w-full bg-white shadow-inner rounded-2xl p-4 flex flex-col border-2 border-gray-300">
          <PorcentajeReservasEfectivasYNoEfectivas />
        </div>
        
      </section>
    </>
  )
}

export default Estadisticas
