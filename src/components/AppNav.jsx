// import { NavLink } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css';
import User from './User';

function AppNav(){
    return <div className={styles.nav} >
        <User/>
        <ul>
       <li><NavLink to={'cities'}>cities</NavLink></li>
       <li><NavLink to={'countries'}>Countries</NavLink></li>
    </ul>
    </div>
}
export default AppNav