
import Details from "@/components/ui/app/DetailsPage";
import TransactionTable from "./TransactionTable"
import { TransactionModal } from "./TransactionModal";


function Cash(){

    return(
        <div>
            <h1 className="text-2xl font-bold text-center text-blue-800 border px-4 py-2 bg-white mb-4"> 
                CASH DETAILS </h1>
            
            <Details type="cash" />            
            <TransactionTable type="cash" />
            <TransactionModal />
            
        </div>

    )
}

export default Cash;