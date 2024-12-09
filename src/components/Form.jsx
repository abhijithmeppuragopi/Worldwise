// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from './Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import { useCities } from "../Contexts/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const {mapLat,mapLng}=useUrlPosition(); //cutom hook to fetch lat and lng from url
  const navigate=useNavigate();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client";
  const [isfetchLocLoading,setisfetchLocLoading]=useState(false);
  const {addNewCity,isLoading}=useCities();
  const [cityError,setCityError]=useState("");
  const [emoji,setemoji]=useState("");

  useEffect(function(){
    async function fetchLocation(){
      setisfetchLocLoading(true)
      setCityError("");
      try{
        const res=await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`)
      const data=await res.json();
      console.log('form',data);
      if(!data.city){
        throw new Error("There's no city where you selected, Choose somewhere else 🤗")
      }
      setCityName(data.city);
      setCountry(data.countryName);
      setemoji(convertToEmoji(data.countryCode));
      }
      catch(err){
        setCityError(err.message);
      }
      finally{
        setisfetchLocLoading(false)
      }
      
    }
    fetchLocation();
  },[mapLat,mapLng])

  async function handleaddNewCity(e){
    e.preventDefault()
    if(!cityName && !country) return
    const newCity={cityName,
      country,
      emoji,
      notes,
      date,
      position:{lat:mapLat,lng:mapLng}
    }
    await addNewCity(newCity);
    navigate('/app/cities');
  }

  if(isfetchLocLoading) return <Spinner/>
  if(cityError) return <h2>{cityError}</h2>

  return (
    <form className={`${styles.form} ${isLoading? styles['loading']:''}`} onSubmit={(e)=>handleaddNewCity(e)}>
      <div className={styles.row}>
        <label htmlFor="cityName">City Name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
      <label htmlFor="date">When did you go to {cityName}?</label>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'} >Add</Button>
        <Button type={'primary'} onClick={(e)=>{
          e.preventDefault(); navigate(-1)}}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
