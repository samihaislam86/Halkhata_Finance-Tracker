
import AppNavbar from "./AppNavbar"

function HomePage() {
  

    return (
        <div>
            <AppNavbar />
            <div className="text-white min-h-screen flex flex-col justify-center px-8">
                <h1 className="font-bold text-6xl">
                    Welcome back, <span className="text-red-500 italic">Samiha</span>
                </h1>
                <h2 className="mt-2 text-white/70">Make your money tracking easy</h2>
                <h3 className="text-white/70">
                    Easy <span className="text-red-500">tracking!</span> Easy <span className="text-red-500">life!</span>
                </h3>

            </div>
        </div>
    )
}

export default HomePage