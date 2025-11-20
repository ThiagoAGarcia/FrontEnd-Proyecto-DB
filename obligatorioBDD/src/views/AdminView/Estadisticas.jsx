import CantidadReservasAlumnosYProfesores from './CantidadReservasAlumnosYProfesores'
import CantidadSancionesProfesoresYAlumnos from './CantidadSancionesProfesoresYAlumnos'
import PorcentajeDeOcupacionPorSala from './porcentajeDeOcupacionPorSala'
import PorcentajeReservasEfectivasYNoEfectivas from './porcentajeReservasEfectivasYNoEfectivas'
import PromedioPorSalas from './promediosPorSalas'
import ReservacionesPorCarreraYFacultad from './ReservacionesPorCarreraYFacultad'
import SalasMasReservadas from './SalasMasReservadas'
import TurnosMasDemandados from './TurnosMasDemandadas'

const Estadisticas = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full bg-white shadow-lg shadow-inner rounded-2xl p-4 flex flex-col border-2 border-gray-300">
          <SalasMasReservadas />
        </div>
        
        <TurnosMasDemandados />
        <PromedioPorSalas />
        <ReservacionesPorCarreraYFacultad />
        <PorcentajeDeOcupacionPorSala />
        <CantidadReservasAlumnosYProfesores />
        <CantidadSancionesProfesoresYAlumnos />
        <PorcentajeReservasEfectivasYNoEfectivas />
      </section>
    </>
  )
}

export default Estadisticas
