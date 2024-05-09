import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFetching, setUser, setError } from '../redux/store'; // Import actions

function Navbar() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch(); // Add useDispatch

    const handleLogout = () => {
        // Clear user state
        dispatch(setFetching(false));
        dispatch(setUser(null));
        dispatch(setError(false));

        // Remove token from local storage
        localStorage.removeItem('token');

        // Redirect to login page
        window.location.href = '/';
    };

    if (user.isFetching) {
        return (
            <>
                loading...........
            </>
        );
    }

    if (!user.isLogin && !user.isFetching) {
        window.location.href = '/';
    }

    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <div className="d-flex flex-row">
                    <div>
                        <img style={{ maxWidth: '120px' }} src="https://cdn3d.iconscout.com/3d/premium/thumb/drizzle-weather-7096832-5753008.png" alt="" />
                    </div>
                    {user?.user?.name}
                    <div className='d-flex align-items-center'>
                        <button onClick={handleLogout}>Logout</button>
                        <h4 className='d-none d-md-block d-sm-block d-lg-block' style={{ fontFamily: 'Arial', fontWeight: 'bold', color: '#343434' }}>Weather Report</h4>
                    </div>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Weather-Report</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item ">
                                <a className="nav-link active mt-1 mb-1" aria-current="page">Graphs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mt-1 mb-1">Admin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
