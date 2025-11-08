import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

export default function Main() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <NavBar />
            <section className="flex-grow flex text-left flex-col justify-center p-10 ">
                <h2 className="text-3xl flex ml-2 mb-3 font-semibold text-gray-800">Grupos</h2>
                <div className="w-full bg-white shadow-md rounded-2xl p-6 flex justify-center items-center h-60 border border-gray-400">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-[#e9f0fd] transition cursor-pointer">
                        <span className="font-medium text-[#052e66]"> <i class="fa-solid fa-plus text-green-600"></i> Crear nuevo grupo</span>
                    </button>
                </div>
            </section>
            hola
            <Footer />
        </div>
    );
}
