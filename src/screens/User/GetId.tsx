import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";
import { findId } from "../../api/userApi";
import "./GetId.css";

function GetId() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [foundId, setFoundId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.trim() === "" || email.trim() === "") {
            alert("이름과 이메일을 모두 입력해 주세요.");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage(null);
            setFoundId(null);
            const result = await findId(name, email);
            setFoundId(`회원님의 아이디는 "${result}" 입니다.`);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "일치하는 회원 정보를 찾을 수 없습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-form-container">
            <p className="getid-description">
                가입 시 등록한 이름과 이메일 주소를 입력해 주시면 아이디를 조회해 드립니다.
            </p>

            <form onSubmit={handleSubmit}>
                <Input
                    label="이름"
                    id="nameInput"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="이메일"
                    id="emailInput"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button text={loading ? "조회 중..." : "아이디 찾기"} type="submit" disabled={loading} />
            </form>

            {foundId && (
                <div className="getid-result">
                    {foundId}
                </div>
            )}

            {errorMessage && (
                <div className="getid-error">
                    {errorMessage}
                </div>
            )}

            <div className="user-form-links">
                <Link to="/user/login" className="user-form-link">
                    로그인
                </Link>
            </div>
        </div>
    );
}

export default GetId;