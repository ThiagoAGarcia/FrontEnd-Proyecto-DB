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
                    <div className="items-center">
                        <h2>Sanciones</h2>
                        {sanctions.map((sanction) => (
                            <div key={sanction.id}>
                                <h2 className="font-semibold">{sanction.name} {sanction.lastName}</h2>
                                <p className="text-blue-900">{sanction.mail}</p>
                                <p>{sanction.ci}</p>

                                <p><span className="text-blue-900 font-semibold">Bibliotecario: </span> {sanction.librarian}</p>
                                <div className="w-full flex flex-row justify-between p-8">
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
