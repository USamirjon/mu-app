// Header.js
function Header() {
    return (
        <div style={{background : "black"}}>
            <br/>

            <div className="container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 text-secondary">Home</a></li>
                </ul>

                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <a href="Filter" type="search" className="button btn text-decoration-underline btn-outline-light">Filter</a>
                </form>

                <div className="text-end">
                    <a href="Login" className="btn btn-outline-light me-2">Login</a>
                    <a href="Signup" className="btn btn-warning">Sign-up</a>
                </div>
            </div>
            <br/>

        </div>

    );
}

export default Header;
