import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";


interface SignupData {
    name: string;
    userID: string;
    email: string;
    password: string;
}

interface SignupProps {
    // 반환 프로미스를 await 해서, 서버 응답이 온 뒤에 로그인 화면으로 이동시킴
    onSubmit?: (data: SignupData) => Promise<void> | void;
}

function Signup({ onSubmit }: SignupProps) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            name.trim() === "" ||
            userID.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "" ||
            passwordConfirm.trim() === ""
        ) {
            alert("모든 입력란을 작성해 주세요.");
            return;
        }
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        await onSubmit?.({ name, userID, email, password });
        // 가입 완료 후 로그인 화면으로 라우팅 이동
        navigate("/user/login");
    };

    return (
        <div className="flex flex-col justify-start w-full max-w-[390px] mx-auto px-6 py-[30px] bg-white box-border">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-[#222222]">회원가입</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <Input
                    label="이름"
                    id="nameInput"
                    name="name"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="아이디"
                    id="idInput"
                    name="userID"
                    placeholder="아이디"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                />
                <Input
                    label="이메일"
                    id="emailInput"
                    name="email"
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label="비밀번호"
                    id="pwInput"
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    label="비밀번호 확인"
                    id="pwConfirmInput"
                    name="passwordConfirm"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <Button text="회원가입" type="submit" />
            </form>

            <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-1.5 mt-5 text-[13px]">
                <Link to="/user/login" className="text-[#868e96] font-medium hover:text-[#ff7a00]">
                    로그인
                </Link>
            </div>
        </div>
    );
}

export default Signup;
