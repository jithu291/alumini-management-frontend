import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function Navbar() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    const handleSignUpClick = () => {
        navigate('/register');
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center space-x-10">
                        <span className="text-xl font-bold text-green-600">Alumni</span>


                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-gray-900 font-medium hover:text-green-600 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/features"
                            className="text-gray-600 hover:text-green-600 transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-600 hover:text-green-600 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-600 hover:text-green-600 transition-colors"
                        >
                            Contact
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            id="signup-button"
                            aria-haspopup="true"
                            onClick={handleSignUpClick}
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                            Sign Up
                        </Button>
                        <Button
                            id="login-button"
                            aria-haspopup="true"
                            onClick={handleClick}
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
