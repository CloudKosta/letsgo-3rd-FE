// import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PostScheduleDetailCard from "./components/detail/PostScheduleDetailCard";

export default function PostScheduleDetailApp() {
  const navigate = useNavigate();

  // 나중에 여기서 API 호출
  // getPostScheduleDetail(id)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center z-50">
        <button onClick={() => navigate("/postSchedule")}>
          <ArrowLeft size={24} />
        </button>
      </header>

      <PostScheduleDetailCard />
    </>
  );
}