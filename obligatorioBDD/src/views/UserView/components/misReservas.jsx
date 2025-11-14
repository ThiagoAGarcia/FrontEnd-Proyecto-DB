export default function MisReservas() {
    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-[#052e66]">Mis reservas</h2>

            <div className="flex flex-col gap-3">
                <div className="p-4 bg-white rounded shadow border flex justify-between">
                    <div>
                        <p className="font-semibold text-[#052e66]">Sala 101</p>
                        <p className="text-sm text-gray-600">14:00 - 16:00</p>
                    </div>
                    <div>
                        <p className="font-semibold text-right text-[#052e66]">2024-04-29</p>
                    </div>
                </div>
            </div>
        </>
    );
}