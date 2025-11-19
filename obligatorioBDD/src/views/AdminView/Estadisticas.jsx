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
        <SalasMasReservadas />
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
