
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from "E:/New_E_Dashboard/frontend/src/Images/logo.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faAdd, faArrowRightFromBracket, faUserPlus,faRightToBracket } from '@fortawesome/free-solid-svg-icons'

function Navbar() {

    const auth = localStorage.getItem('auth');
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup')

    }

    return (
        <div>
            
                <img src={logo} alt='logo' className='logo'></img>
                {
                auth ?

                    <ul className='Nav'>
                        <li><Link to='/'><FontAwesomeIcon icon={faList} /> Products</Link></li>
                        <li><Link to='/add'><FontAwesomeIcon icon={faAdd} /> Add Product</Link></li>
                
                        <li><Link onClick={logout} to='/signup'><FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout ({JSON.parse(user).name}) </Link></li>
                    
        
                    </ul>
                    :
                    <ul  className='Nav Nav-left'>
                        <li><Link to='/signup'><FontAwesomeIcon icon={faUserPlus} /> SignUp</Link></li>
                        <li> <Link to='/login'><FontAwesomeIcon icon={faRightToBracket} /> Login</Link></li>

                    </ul>


            }


        </div>
    )}

    export default Navbar;