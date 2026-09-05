
import '../../App.css'
import Details from '@/components/ui/app/DetailsPage';
import DashboardAccCard from '@/components/ui/Dashboard/DashboardAccount';
import DashboardExpCard from '@/components/ui/Dashboard/DashboardExpense';


function Dashboard() {
    const today = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <div>
            <div className="flex justify-between items-center mb-2 bg-white rounded-xl border shadow-xl px-4 py-2">
                <h1 className="text-xl text-blue-800 font-semibold">হালখাতা</h1>

                <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 max-w-md mx-6 px-4 py-2 rounded-full border text-sm bg-gray-50"
                />
                <div className="text-sm text-gray-500 border rounded-full px-4 py-1.5 whitespace-nowrap">
                    {today}
                </div>
            </div>
            <Details/>
            <div className="grid grid-cols-3 gap-4 mt-2" >
                <DashboardAccCard/>
                <div className="col-span-2 mb-2 bg-white rounded-xl border shadow-xl px-4 py-4">
                    <h1 className="text-xl  py-5 font-semibold">monthly expense</h1>
                </div>
            </div>
            <DashboardExpCard/>
        </div>

    )
}

export default Dashboard;