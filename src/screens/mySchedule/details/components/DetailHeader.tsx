import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DetailHeaderProps {
    title?: string;
}

function DetailHeader({ title }: DetailHeaderProps) {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
            <div className="flex items-center gap-2">
                <button onClick={() => navigate('/mySchedule')}>
                    <ArrowLeft size={24} />
                </button>
                <h1 className="font-bold text-lg">{title ?? ''}</h1>
            </div>
        </header>
    );
}

export default DetailHeader;
