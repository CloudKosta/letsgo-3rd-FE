import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { useLogin } from "./hooks/useLogin";
import "./Login.css";

function Login() {
    const { errorMessage, loading, handleLogin } = useLogin();
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userID.trim() === "" || password.trim() === "") {
            alert("아이디와 비밀번호를 입력해 주세요.");
            return;
        }
        handleLogin(userID, password);
    };

    return (
        <div className="user-form-container">

            {errorMessage && (
                <div className="user-form-error">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <Input
                    label="아이디"
                    id="userId"
                    name="userID"
                    placeholder="아이디를 입력하세요"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                />
                <Input
                    label="비밀번호"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button text={loading ? "로그인 중..." : "로그인"} type="submit" disabled={loading} />
            </form>

            <div className="user-form-links">
                <Link to="/user/getid" className="user-form-link">
                    아이디 찾기
                </Link>
                <Link to="/user/updatepw" className="user-form-link">
                    비밀번호 찾기
                </Link>
                <Link to="/user/signup" className="user-form-link">
                    회원가입
                </Link>
            </div>

            <GoogleLoginButton />
        </div>
    );
}

export default Login;