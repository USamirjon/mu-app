import React from "react";
import { useAuth, handleLogout } from "./signup";
import './header.css';

function Header() {
    const isAuthenticated = useAuth();

    return (
        <header id="header" className="header d-flex align-items-center sticky-top bg-black py-3">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                {/* Логотип */}
                <a href="/" className="logo d-flex align-items-center text-white text-decoration-none me-auto">
                    <h1 className="sitename m-0 ms-2">Ringmaster</h1>
                </a>

                {/* Кнопка сортировки */}
                <div className="d-flex align-items-center ms-3">
                    <a href="/filter" className="btn btn-outline-light text-white">Sort</a>
                </div>

                {/* Блок авторизации */}
                <div className="text-end ms-3">
                    {isAuthenticated ? (
                        <>
                            <button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
                            <a href="/profile" className="btn btn-outline-light">Profile</a>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="btn btn-outline-light me-2">Login</a>
                            <a href="/signup" className="btn btn-warning">Sign-up</a>
                        </>
                    )}
                </div>

            </div>
        </header>
    );
}

export default Header;
