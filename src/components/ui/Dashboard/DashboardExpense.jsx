import { Link } from "react-router-dom"


function DashboardExpCard(){
    return(
        <div className="grid grid-cols-3 gap-4 mt-2" >
                <div className=" mb-2 bg-white rounded-xl border shadow-xl px-4 py-4">
                    <div className="text-xl  py-5 font-semibold">
                        <Link to="/expense">Expenses by category</Link>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        

                    </div>
                </div>
            </div>

    )
}

export default DashboardExpCard