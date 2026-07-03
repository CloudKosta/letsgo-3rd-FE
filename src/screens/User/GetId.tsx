import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";


interface GetIdProps {
    onSubmit?: (name: string, email: string) => Promise<string>;
}

function GetId({ onSubmit }: GetIdProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [foundId, setFoundId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim() === "" || email.trim() === "") {
            alert("이름과 이메일을 모두 입력해 주세요.");
            return;
        }

        if (!onSubmit) {
            setFoundId("서버 연동이 아직 설정되지 않았습니다.");
            return;
        }

        try {
            setLoading(true);
            const result = await onSubmit(name, email);
            setFoundId(result);
        } catch {
            setFoundId("일치하는 회원 정보를 찾을 수 없습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center w-full max-w-[390px] mx-auto px-6 py-[30px] bg-white box-border">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-[#222222]">아이디 찾기</h2>
            </div>

            <p className="text-[13px] text-[#868e96] mb-5 leading-relaxed">
                가입 시 등록한 이름과 이메일 주소를 입력해 주시면 아이디를 조회해 드립니다.
            </p>

            <form onSubmit={handleSubmit}>
                <Input
                    label="이름"
                    id="nameInput"
                    name="name"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="이메일"
                    id="emailInput"
                    name="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button text={loading ? "조회 중..." : "아이디 찾기"} type="submit" disabled={loading} />
            </form>

            {foundId && (
                <div className="mt-5 p-4 rounded-2xl bg-[#f8f9fa] border border-[#e9ecef] text-center font-bold text-[#ff7a00]">
                    {foundId}
                </div>
            )}

            <div className="flex flex-wrap justify-center gap-x-3.5 gap-y-1.5 mt-5 text-[13px]">
                <Link to="/user/login" className="text-[#868e96] font-medium hover:text-[#ff7a00]">
                    로그인
                </Link>
            </div>
        </div>
    );
}

export default GetId;
