function Header({title, handleLogout}) {
    return (
        <header className="header">
            <h1>{title}</h1>
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
}
export default Header;