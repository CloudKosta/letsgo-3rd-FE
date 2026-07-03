import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";

interface LoginProps {
    errorMessage?: string;
    onSubmit?: (userID: string, password: string) => void;
}

function Login({ errorMessage, onSubmit }: LoginProps) {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userID.trim() === "" || password.trim() === "") {
            alert("아이디와 비밀번호를 입력해 주세요.");
            return;
        }
        onSubmit?.(userID, password);
    };

    return (
        <div className="flex flex-col justify-center w-full max-w-[390px] mx-auto px-6 py-[30px] bg-white box-border">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-[#222222]">로그인</h2>
            </div>

            {errorMessage && (
                <div className="bg-[#fdecec] text-[#d9534f] border border-[#f5c2c0] rounded-2xl px-3.5 py-2.5 text-[13px] mb-4 text-center">
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
                <Button text="로그인" type="submit" />
            </form>

            <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-1.5 mt-5 text-[13px]">
                <a href="/oauth2/authorization/google" className="text-[#868e96] font-medium hover:text-[#ff7a00]">
                    구글로 로그인
                </a>
                <Link to="/user/getid" className="text-[#868e96] font-medium hover:text-[#ff7a00]">
                    아이디 찾기
                </Link>
                <Link to="/user/updatepw" className="text-[#868e96] font-medium hover:text-[#ff7a00]">
                    비밀번호 찾기
                </Link>
                <Link to="/user/signup" className="text-[#868e96] font-medium hover:text-[#ff7a00]">
                    회원가입
                </Link>
            </div>
        </div>
    );
}

export default Login;
