import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PostScheduleRouteMap from "./components/detail/PostScheduleRouteMap";
import PostScheduleRouteList from "./components/detail/PostScheduleRouteList";
import { mockPostScheduleDetails } from "../../data/mockPostScheduleDetails";

export default function PostScheduleDetailApp() {
  const { id } = useParams();
  const detail = id ? mockPostScheduleDetails[id] : null;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!id) return;
    
  //   axios.get<PostScheduleDetail>(`/api/postSchedule/${id}`)
  //     .then(res => {
  //       setDetail(res.data);
  //     });
  //   }, [id]);


  if (!detail) {
    return <div>로딩중...</div>;
  }

  return (

    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center z-50">
        <button onClick={() => navigate("/postSchedule")}>
          <ArrowLeft size={24} />
        </button>
      </header>

      <PostScheduleRouteMap maps={detail.maps} />
      <PostScheduleRouteList routes={detail.routes} />
    </>
  );
}
