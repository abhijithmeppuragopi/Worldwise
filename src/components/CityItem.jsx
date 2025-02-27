/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../Contexts/CityContext';
import Spinner from './Spinner';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));


function CityItem({ city }){
    const {cityName,date,emoji,id,position}=city;
    const{currentCity,deleteCity,isLoading}=useCities();
    const {lat,lng}=position;

    function handleDelete(e){
      e.preventDefault();
      deleteCity(city.id);

    }
    if(isLoading) return <Spinner/>
    return <li><Link className={`${styles.cityItem}  ${id===currentCity.id? styles["cityItem--active"]:''}`} to={`${id}?lat=${lat}&lng=${lng}`}> 
       <span className={styles.emoji}>{emoji}</span> 
       <h3 className={styles.name}>{cityName}</h3>
       <time className={styles.date}>{formatDate(date)}</time>
       <button className={styles.deleteBtn} onClick={(e)=>handleDelete(e)}>&times;</button>
   </Link> </li>
}
export default CityItem