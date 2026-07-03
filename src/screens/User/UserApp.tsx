import Login from "./Login";
import Signup from "./Signup";
import GetId from "./GetId";
import UpdatePw from "./UpdatePw";
import { Route, Routes } from "react-router-dom";

function UserApp() {
    return (
        <Routes>
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup />} />
            <Route path="getid" element={<GetId />} />
            <Route path="updatepw" element={<UpdatePw />} />
        </Routes>
    );
}

export default UserApp;