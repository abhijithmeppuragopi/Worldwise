import { createContext, useContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

const CitiesContext=createContext();
const BASE_URL='http://localhost:9000';

  function CitiesProvider({children}){
  const[cities,setCities]=useState([]);
  const[isLoading,setisLoading]=useState(false);
  const[currentCity,setCurrentCity]=useState({});
  
  useEffect(function(){
    async function fetchdata(){
      try{
        setisLoading(true)
      const res=await fetch(`${BASE_URL}/cities`);
      const data=await res.json();
      setCities(data);

    }catch(err){
      console.error('Something went wrong',err)
    }
    finally{
      setisLoading(false)
    }
    }
    fetchdata()
  },[])

  async function getCity(id){
    try{
      setisLoading(true)
    const res=await fetch(`${BASE_URL}/cities/${id}`);
    const data=await res.json();
    setCurrentCity(data);

  }catch(err){
    console.error('Something went wrong',err)
  }
  finally{
    setisLoading(false)
  }
  }

  async function addNewCity(newcity){
    try{
      setisLoading(true)
      await fetch(`${BASE_URL}/cities`,{
      method:"POST",
      body: JSON.stringify(newcity),
      headers:{"Content-Type":"application/js",
    },
    });
    setCities([...cities,newcity]);

  }catch(err){
    console.error('Something went wrong',err)
  }
  finally{
    setisLoading(false)
  }
  }

  async function deleteCity(id){
    try{
      setisLoading(true)
    await fetch(`${BASE_URL}/cities/${id}`,{
      method:"DELETE",
    });
    setCities((cities)=>cities.filter((city)=>{
      if(city.id!==id)
        return city
    }));

  }catch(err){
    console.error('Something went wrong',err)
  }
  finally{
    setisLoading(false)
  }
  }


  return(
    <CitiesContext.Provider value={{cities,isLoading,getCity,currentCity,setCities,addNewCity,deleteCity}}>
        {children}
    </CitiesContext.Provider>
  )
  }

  function useCities(){
    const context=useContext(CitiesContext);
    if(context===undefined) throw new Error('You are using the context outside the citiesProvider')
    return context
  }

  export {useCities,CitiesProvider}