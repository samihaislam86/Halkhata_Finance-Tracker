import { Link } from "react-router-dom"

function CategoryCard({ id, name }) {
    return (
        <div className="border-2 border-blue-800 rounded-lg p-4 flex flex-col justify-between h-40">
            <h2 className="text-2xl font-bold text-blue-800">{name}</h2>
            <Link to={`/expense/${id}`} className="text-blue-800 text-sm">
                See Details
            </Link>
        </div>
    )
}

export default CategoryCard;