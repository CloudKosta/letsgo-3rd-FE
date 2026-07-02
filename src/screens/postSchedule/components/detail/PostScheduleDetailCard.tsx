
const routeData = [
    { id : 1, name : "목동 아이스링크장"},
    { id : 2, name : "은행골"},
    { id : 3, name : "집"}
]


export default function PostScheduleDetail() {
    return(
        <div>
            <div className="w-full h-48 bg-gray-200 border-2 border-gray-600 rounded-2xl mb-4">
                
            </div>
            <ul className="flex flex-col gap-3">
        {routeData.map((place) => (
          <li 
            key={place.id} 
            className="flex items-center w-60 p-3 bg-white border-2 border-gray-600 rounded-xl"
          >
            <span className="flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold border-2 border-gray-600 rounded-full">
              {place.id}
            </span>
            <span className="font-bold text-gray-800">
              {place.name}
            </span>
          </li>
        ))}
      </ul>
        </div>
    );
}