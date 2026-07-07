import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";
import { updatePassword } from "../../api/userApi";
import "./UpdatePw.css";

function UpdatePw() {
    const navigate = useNavigate();
    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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

        try {
            setLoading(true);
            await updatePassword({ userID, email, password, passwordConfirm });
            alert("비밀번호가 변경되었습니다. 로그인해 주세요.");
            navigate("/user/login");
        } catch (err) {
            alert(err instanceof Error ? err.message : "비밀번호 변경에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-form-container">

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
                <Button text={loading ? "변경 중..." : "비밀번호 변경"} type="submit" disabled={loading} />
            </form>

            <div className="user-form-links">
                <Link to="/user/login" className="user-form-link">
                    로그인
                </Link>
            </div>
        </div>
    );
}

export default UpdatePw;