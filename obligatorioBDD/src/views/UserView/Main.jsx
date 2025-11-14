import {useState} from 'react'
import NavBar from '../../components/navBar'
import Modal from '../components/modal.jsx'
import getUsersService from '../../service/getUsersService.jsx'
import Footer from '../../components/footer'

export default function Main() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <section className="flex-grow flex text-left flex-col justify-center p-10 ">
        <h2 className="text-3xl flex ml-2 mb-3 font-semibold text-gray-800">
          Grupos
        </h2>
        <div className="w-full bg-white shadow-md rounded-2xl p-6 flex justify-center items-center h-60 border border-gray-400">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-[#e9f0fd] transition cursor-pointer" onClick={() => setOpen(true)}>
            <span className="font-medium text-[#052e66]">
              {' '}
              <i className="fa-solid fa-plus text-green-600"></i> Crear nuevo grupo
            </span>
          </button>
        </div>
      </section>
      <Footer />
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='text-center w-56'>
          <div className='mx-auto my-4 w-48'>
        
          </div>
        </div>
      </Modal>
    </div>
  )
}
