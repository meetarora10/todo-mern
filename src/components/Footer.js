function Footer({count}){
    const footerStyle = {
        backgroundColor: '#f0f0f0',
        color: '#333',
        padding: '15px',
        textAlign: 'center',
        fontSize:'0.9em',
        borderTop: '1px solid #ccc'
    };
    const itemCountStyle = {
        marginLeft: '10px',
        fontSize: '1.2em',
        fontWeight: 'bold'
    };
    return(
        <footer className="footer" style={footerStyle}>
            Copyright &copy; All rights.
            <span className="item-count" style={itemCountStyle}>{count} items</span>
        </footer>
    )
}
export default Footer;