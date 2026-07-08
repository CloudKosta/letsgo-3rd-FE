import Login from "./Login";
import Signup from "./Signup";
import GetId from "./GetId";
import UpdatePw from "./UpdatePw";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function UserApp() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full flex-1 flex flex-col bg-white">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-50 cursor-pointer"
                aria-label="뒤로가기"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="getid" element={<GetId />} />
                <Route path="updatepw" element={<UpdatePw />} />
            </Routes>
        </div>
    );
}

export default UserApp;