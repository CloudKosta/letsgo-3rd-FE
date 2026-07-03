import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";

interface UpdatePwData {
    userID: string;
    email: string;
    password: string;
}

interface UpdatePwProps {
    onSubmit?: (data: UpdatePwData) => Promise<void> | void;
}

function UpdatePw({ onSubmit }: UpdatePwProps) {
    const navigate = useNavigate();
    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            userID.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "" ||
            passwordConfirm.trim() === ""
        ) {
            alert("모든 입력란을 작성해 주세요.");
            return;
        }
        if (password !== passwordConfirm) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        await onSubmit?.({ userID, email, password });
        navigate("/user/login");
    };

    return (
        <div className="flex flex-col justify-center w-full max-w-[390px] mx-auto px-6 py-[30px] bg-white box-border">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-[#222222]">비밀번호 찾기</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <Input
                    label="아이디"
                    id="userIdInput"
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
                    label="새 비밀번호"
                    id="newPasswordInput"
                    name="password"
                    type="password"
                    placeholder="새비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    label="새 비밀번호 확인"
                    id="newPasswordConfirmInput"
                    name="passwordConfirm"
                    type="password"
                    placeholder="새비밀번호 확인"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <Button text="비밀번호 변경" type="submit" />
            </form>

            <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-1.5 mt-5 text-[13px]">
                <Link to="/user/login" className="text-[#868e96] font-medium hover:text-[#ff7a00]">
                    로그인
                </Link>
            </div>
        </div>
    );
}

export default UpdatePw;
