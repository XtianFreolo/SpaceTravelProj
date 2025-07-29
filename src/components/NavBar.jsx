import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
    return (

        <nav className={styles.navbar}>

            <Link className={styles.navItem} to="/">HomePage</Link>
            <Link className={styles.navItem} to="/spaceship">Spaceship</Link>
            <Link className={styles.navItem} to="/planets">Planets</Link>

        </nav>
    );
}

export default NavBar;