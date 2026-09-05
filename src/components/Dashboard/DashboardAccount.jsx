
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/ui/button";


function DashboardAccCard() {
    return (
        <div className=" mb-2 bg-white rounded-xl border shadow-xl px-4 py-4">
            <div className="text-xl  py-5 font-semibold">
                <Link to="/accounts">Accounts</Link>
            </div>
            <div className="flex flex-col gap-2 ">
                <Button variant="outline">
                    <Link to="/accounts/cash" className="text-sm font-medium">Cash</Link>
                </Button>
                <Button variant="outline" >
                    <Link to="/accounts/bank" className="text-sm font-medium">Bank</Link>
                </Button>
                <Button variant="outline" >
                    <Link to="/accounts" className="text-sm font-medium">View Details</Link>
                </Button>

            </div>
        </div>
            )
}
export default DashboardAccCard;