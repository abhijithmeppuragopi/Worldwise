import CityItem from "./CityItem"
import Spinner from "./Spinner"
import Message from './Message'
import styles from './CityList.module.css'
import { useCities } from "../Contexts/CityContext"


function CityList(){
    const {cities,isLoading}=useCities();
   if(isLoading) return <Spinner/>
   if(!cities.length) return <Message Message={'Add a city to your list'}/>
    return <ul className={styles.cityList}>
        {cities.map((city)=>
   <CityItem city={city} key={city.id}/>)}
            
        </ul>   
}
export default CityList