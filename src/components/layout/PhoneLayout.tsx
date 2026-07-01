import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import Navbar from './NavBar';

function PhoneLayout() {
    return (
        <div>
            <Header />

            <BrowserRouter>
                <Navbar />
            </BrowserRouter>

        </div>
    );
}

export default PhoneLayout;