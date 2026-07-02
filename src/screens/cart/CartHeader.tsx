
function CartHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
            <a href="/" className="font-bold text-xl tracking-tight text-blue-600">
                장바구니
            </a>
        </header>
    );
}

export default CartHeader;