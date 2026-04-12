import { oasisSuccess } from "@/utils/constant"
import { formatNumber } from "@/lib/utils"

interface SuccessProps {
  labelColor?: string;
}

function Success({labelColor = "text-black"}){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-3.5 gap-y-8 md:grid-cols-2">
            {oasisSuccess.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-x-4">
                    <h1 className="text-3xl font-poppins font-semibold text-myprimaryColor">{formatNumber(item.value)}</h1>
                    <p className={`font-semibold text-md ${labelColor}`}>{item.label}</p>
                </div>    
            ))}   
        </div>
    )
}

export default Success