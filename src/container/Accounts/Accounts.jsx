import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"
import { TransactionModal } from "./TransactionModal";
import Details from "@/components/app/DetailsPage";

function Accounts() {

    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-blue-800 border px-4 py-2 bg-white mb-4"> MY ACCOUNTS</h1>
            <Details/>
            <div className="grid grid-cols-2 gap-6 mt-4">
                <div className=" flex flex-col bg-white border rounded-xl shadow-sm p-4 text-center shadow-lg">
                    <Link to="/accounts/cash" className="text-sm font-medium"><h1 className="text-bold text-2xl">Cash</h1></Link>
                    <Button variant="outline" className="mt-4 ">
                        <Link to="/accounts/cash" className="text-sm font-medium">View details</Link>
                    </Button>
                </div>
                <div className="flex flex-col bg-white border rounded-xl shadow-sm p-4 text-center shadow-lg">
                    <Link to="/accounts/bank" className="text-sm font-medium"><h1 className="text-bold text-2xl">Bank</h1></Link>
                    <Button variant="outline" className="mt-4 " asChild>
                        <Link to="/accounts/bank" className="text-sm font-medium">View details</Link>
                    </Button>
                </div>
            </div>
            <div>
                <TransactionModal />
            </div>
        </div>

    )
}

export default Accounts;