import Details from "@/components/app/DetailsPage";
import TransactionTable from "./TransactionTable"
import { TransactionModal } from "./TransactionModal";

function Bank(){
    return(
        
        <div>
            <h1 className="text-2xl font-bold text-center text-blue-800 border px-4 py-2 bg-white mb-4"> 
                BANK DETAILS </h1>
            <Details type="bank" /> 
            <TransactionModal />          
            <TransactionTable type="bank" />
            
        </div>

    )
}

export default Bank;