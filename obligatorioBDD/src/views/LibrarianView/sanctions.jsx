import { useEffect, useState } from "react"
import getDaySanctionsService from "../../service/getDaySanctionsService"

export default function Sanctions() {
    const [sanctions, setSanctions] = useState([]);

    useEffect(() => {
        const getTodaySanctions = async () => {
            const todaySanctions = await getDaySanctionsService();
            console.log(todaySanctions)
            if (todaySanctions?.success) {
                let todaySanctionsArray = todaySanctions.sanciones || [];
                console.log(todaySanctionsArray)
                setSanctions(todaySanctionsArray);
            } else {
                setSanctions([]);
            }
        }

        getTodaySanctions();
    }, [])

    return (
        <>
            {sanctions.length > 0 ?
                (
                    <div className="flex flex-col gap-5 items-start">
                        <h2 className="ml-1 font-semibold text-gray-800 text-2xl">
                            Sanciones
                        </h2>
                        {sanctions.map((sanction) => (
                            <div key={sanction.id} className="border-grey-400 border-1 p-2 rounded-lg w-full">
                                <h2 className="font-semibold text-blue-900 text-xl">{sanction.name} {sanction.lastName}</h2>

                                <p><span className="font-semibold">Correo: </span>{sanction.mail}</p>
                                <p><span className="font-semibold">Cédula: </span>{sanction.ci}</p>

                                <p><span className="text-blue-900 font-semibold">Bibliotecario: </span> {sanction.librarian}</p>
                                <div className="w-1/2 flex flex-row justify-between p-8">
                                    <p><span className="text-grey-800">Fecha de inicio</span> <br></br> {sanction.start}</p>
                                    <p><span className="text-grey-800">Fecha de finalización</span> <br></br> {sanction.end}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                :
                (
                    <span className="font-medium text-2xl text-gray-600">
                        No se ha enviado ninguna sanción hoy
                    </span>
                )}
        </>
    )
}
