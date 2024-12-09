import CountryItem from "./CountryItem"
import Spinner from "./Spinner"
import Message from './Message'
import styles from './CountryList.module.css'
// import { useContext } from "react";
import { useCities } from "../Contexts/CityContext";


function CountryList(){
    const {cities,isLoading}=useCities();
//to make an array with country names,but no duplicates
    const countries=cities.reduce((arr,city)=>{
       if(arr.map((el)=>el.country).includes(city.country)) return arr
       else return [...arr,{country:city.country,emoji:city.emoji}]
    },[])


   if(isLoading) return <Spinner/>
   if(!countries.length) return <Message Message={'Add a city to your list'}/>
    return <ul className={styles.countryList}>
        {countries.map((country)=>
   <CountryItem country={country} key={country.country}/>)}
            
        </ul>   
}
export default CountryList