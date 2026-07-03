import { Route, Routes } from "react-router-dom";
import PostScheduleApp from "./PostScheduleApp";
import PostScheduleDetailApp from "./PostScheduleDetailApp";


function PostScheduleLayout() {
    return (
        <Routes>
            <Route path="/" element={<PostScheduleApp />} />
            <Route path="/:id" element={<PostScheduleDetailApp />} />
        </Routes>
    );
}

export default PostScheduleLayout;
