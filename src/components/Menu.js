import { useNavigate, Link } from 'react-router-dom';
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faCameraRetro, faHeart, faVideoCamera, faCalendar, faSignOut, faComments } from '@fortawesome/free-solid-svg-icons';



export function Menu({ onLogout }) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await onLogout();
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <button className="btn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOut} />
            </button>
            <div>
                <nav className="menu">
                    <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open" />
                    <label className="menu-open-button" htmlFor="menu-open">
                        <span className="lines line-1"></span>
                        <span className="lines line-2"></span>
                        <span className="lines line-3"></span>
                    </label>

                    <Link to="/gallery" className="menu-item blue"> <FontAwesomeIcon icon={faCameraRetro} /> </Link>
                    <a href="b" className="menu-item green"> <FontAwesomeIcon icon={faCoffee} /> </a>
                    <a href="c" className="menu-item red"> <FontAwesomeIcon icon={faHeart} /> </a>
                    <a href="d" className="menu-item purple"> <FontAwesomeIcon icon={faVideoCamera} /> </a>
                    <Link to="/notes" className="menu-item orange"> <FontAwesomeIcon icon={faComments} /> </Link>
                    <a href="f" className="menu-item lightblue"> <FontAwesomeIcon icon={faCalendar} /> </a>
                </nav>
            </div>
        </div>
    );
}