import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";
import { signUp } from "../../api/userApi";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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

        try {
            setLoading(true);
            await signUp({ name, userID, email, password, passwordConfirm });
            alert("회원가입이 완료되었습니다. 로그인해 주세요.");
            navigate("/user/login");
        } catch (err) {
            alert(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
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
                <Button text={loading ? "가입 중..." : "회원가입"} type="submit" disabled={loading} />
            </form>

            <div className="user-form-links">
                <Link to="/user/login" className="user-form-link">
                    로그인
                </Link>
            </div>
        </div>
    );
}

export default Signup;