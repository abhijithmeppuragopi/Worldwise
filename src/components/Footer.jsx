import Styles from './Footer.module.css'
function Footer(){
    return <div className={Styles.footer}>
        <p className={Styles.copyright}>&copy; Copyright {new Date().getFullYear()} by 
            worldwisw Ltd
        </p>


    </div>
}
export default Footer