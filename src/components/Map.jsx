import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useCities } from '../Contexts/CityContext';
import { useEffect, useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map(){
   const {mapLat,mapLng}=useUrlPosition(); //cutom hook to fetch lat and lng from url
    const[mapPosition,setMapPosition]=useState([40,0]);
    const{isLoading:isMapLoading, position:CurrentPosition, getPosition}=useGeolocation(); //cutom hook to get the current lat & lng
    const {cities}=useCities(); //useContext

     
     console.log('from hook',CurrentPosition);
    console.log('cities mapLat mapLng',mapLat,mapLng);

    useEffect(function(){
        if(mapLat && mapLng !==null) setMapPosition([mapLat,mapLng])
    },[mapLat,mapLng])

    useEffect(function(){
        if(CurrentPosition)
        setMapPosition(CurrentPosition)
    },[CurrentPosition])
    
    return <div  className={styles.mapContainer}>
       {!CurrentPosition && <Button type={'position'} onClick={getPosition}>{isMapLoading?'Loading':'get location'}</Button> }
       <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  />
  <Marker position={mapPosition}></Marker>
  {cities?.map((city)=>(
    <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
    <Popup>
      <span>{city.emoji}</span><span>{city.country}</span>
    </Popup>
  </Marker>))}
  <Changecenter position={mapPosition}/>
  <DetectClick/>
</MapContainer>



       </div> 
}

function Changecenter({position}){
    const map=useMap();
    map.setView(position);
    return null;
}
function DetectClick(){
    const navigate=useNavigate();
useMapEvent({
    click:(e) =>{
        console.log(e);
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
});

}
export default Map