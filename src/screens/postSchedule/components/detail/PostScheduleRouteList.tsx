import type { RouteSchedule } from "../../../../types";


interface PostScheduleDetailCardProps {
  routes : RouteSchedule[];
}


export default function PostScheduleDetail({ routes }: PostScheduleDetailCardProps) {
    return(
        <div>
            <ul className="flex flex-col gap-3">
        {routes.map((route) => (
          <li 
            key={route.visitId} 
            className="flex items-center w-60 p-3 bg-white border-2 border-gray-600 rounded-xl"
          >
            <span className="flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold border-2 border-gray-600 rounded-full">
              {route.visitOrder}
            </span>
            <span className="font-bold text-gray-800">
              {route.title}
            </span>
          </li>
        ))}
      </ul>
        </div>
    );
}