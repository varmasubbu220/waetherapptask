import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFetching, setUser, setError } from '../redux/store'; // Import actions
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Navbar() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch(); // Add useDispatch
    const adminEmail = process.env.REACT_APP_ADMIN_EMAILS;
    const navigate = useNavigate(); // Initialize useNavigate


    const handleLogout = () => {
        // Clear user state
        dispatch(setFetching(false));
        dispatch(setUser(null));
        dispatch(setError(false));

        // Remove token from local storage
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/');
    };



    if (user.isFetching) {
        return (
            <>
                loading...........
            </>
        );
    }

    if (!user.isLogin && !user.isFetching) {
        navigate('/');
    }

    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <div  className="d-flex flex-row ">
                    <div>
                        <img style={{ maxWidth: '120px' }} src="https://cdn3d.iconscout.com/3d/premium/thumb/drizzle-weather-7096832-5753008.png" alt="" />
                    </div>
                    <div className='d-flex align-items-center'>
                        <h4 className='d-none d-md-block d-sm-block d-lg-block' style={{ fontFamily: 'Arial', fontWeight: 'bold', color: '#343434' }}>Weather Report</h4>
                    </div>
                </div>
                <div className='d-flex justify-content-end d-none d-sm-block d-md-block d-lg-block' style={{width:"65%"}}>
                    <p className='text-center mt-2' style={{fontFamily:"Tahoma"}}>
                                        <img style={{height:'30px',width:"30px",borderRadius:'50%',marginRight:'4px'}} src={user?.user?.picture}/>
                                        {user?.user?.name}
                                        <span>{adminEmail==user?.user?.email&& "(Admin)"}</span>
                    </p>
                </div>          
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title fw-bolder" id="offcanvasNavbarLabel">Weather-Report</h5>
                       
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <h6 className='fst-italic' style={{marginLeft:"8px"}}>{user?.user?.email}</h6>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                        <div className='d-flex justify-content-end d-block d-sm-none d-md-none d-lg-none' style={{width:"65%"}}>
                    <p className='text-center mt-2' style={{fontFamily:"Tahoma"}}>
                                        <img style={{height:'30px',width:"30px",borderRadius:'50%',marginRight:'4px'}} src={user?.user?.picture}/>
                                        {user?.user?.name}
                                        <span>{adminEmail==user?.user?.email&&"Admin"}</span>
                    </p>
                </div>                             </li>
                           <li className="nav-item">
                                <a style={{ cursor: 'pointer' }} className="nav-link active mt-1 mb-1 fw-medium" aria-current="page" onClick={()=>{navigate('/home');}}>city Forecast</a>
                            </li>
                            <li className="nav-item">
                                <a  style={{ cursor: 'pointer' }} className="nav-link active mt-1 mb-1 fw-medium" aria-current="page" onClick={()=>{navigate('/temperature');}}>Temperature Forecast</a>
                            </li>
                            <li className="nav-item">
                                <a style={{ cursor: 'pointer' }} className="nav-link active mt-1 mb-1 fw-medium" aria-current="page" onClick={()=>{navigate('/hourly');}}>Hourly Forecast</a>
                            </li>
                           
                            {adminEmail==user?.user?.email&&<li className="nav-item">
                                <a style={{ cursor: 'pointer' }} className="nav-link mt-1 mb-1 fw-medium" onClick={()=>{navigate('/users');}}>UsersManagement</a>
                            </li>}
                            
                            <li className="nav-item">
                                <button type="button" className="btn btn-outline-success mt-1 mb-1" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
             
            </div>
        </nav>
    );
}

export default Navbar;
