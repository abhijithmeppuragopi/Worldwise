import { createContext, useContext, useEffect, useReducer } from "react";
const CitiesContext=createContext();
const BASE_URL='http://localhost:9000';

const initialstate={
  cities:[],
isLoading:false,
currentCity:{},
error:'',}
function reducer(state,action){
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading:true,
      };
      case 'cities/loading':
        return {
          ...state,
          isLoading:false,
          cities:action.payload,
        };
        case 'city/getcity':
          return {
            ...state,
            isLoading:false,
            currentCity:action.payload,
          };
          case 'city/addnew':
          return {
            ...state,
            isLoading:false,
            cities:[...state.cities,action.payload]
          };
      
      case 'city/delete':
        return {
          ...state,
          isLoading:false,
          cities: state.cities.filter((city)=> city.id !==action.payload),
        };
      case 'rejected':
        return {
          ...state,
          isLoading:false,
          error:action.payload,
        };
      
    default :
       throw new Error("fffffffff");
}
}

  function CitiesProvider({children}){
  // const[cities,setCities]=useState([]);
  // const[isLoading,setisLoading]=useState(false);
  // const[currentCity,setCurrentCity]=useState({});
  const[{cities,isLoading,currentCity,error},dispatch]=useReducer(reducer,initialstate)
  
  useEffect(function(){
    async function fetchdata(){
      dispatch({type:'loading'})
      try{
        // setisLoading(true)
       
      const res=await fetch(`${BASE_URL}/cities`);
      const data=await res.json();
      // setCities(data);
      dispatch({type:'cities/loading',payload:data})
    }catch{
      dispatch({type:'rejected',payload:' city loading error'})
    }
    }
    fetchdata()
  },[])

  async function getCity(id){
    dispatch({type:'loading'});
    try{
      // setisLoading(true)
    const res=await fetch(`${BASE_URL}/cities/${id}`);
    const data=await res.json();
    // setCurrentCity(data);
    dispatch({type:'city/getcity',payload:data})

  }catch{
    dispatch({type:'rejected',payload:'get city error'})
  }
  }

  async function addNewCity(newcity){
    dispatch({type:'loading'})
    try{
      // setisLoading(true)
    
      const res=await fetch(`${BASE_URL}/cities`,{
      method:"POST",
      body: JSON.stringify(newcity),
      headers:{"Content-Type":"application/js",
    },
    });
    const data= await res.json();
    console.log(data);
    dispatch({type:'city/addnew',payload:data})
    // setCities([...cities,newcity]);

  }catch{
    dispatch({type:'rejected',payload:'add city error'})
  }
  }

  async function deleteCity(id){
    dispatch({type:'loading'})
    try{
      // setisLoading(true)
   
    await fetch(`${BASE_URL}/cities/${id}`,{
      method:"DELETE",
    });
    dispatch({type:'city/delete',payload:id})
    // setCities((cities)=>cities.filter((city)=>{
    //   if(city.id!==id)
    //     return city
    // }));

  }catch{
    dispatch({type:'rejected',payload:'delete city error'})
  }
}


  return(
    <CitiesContext.Provider value={{cities,isLoading,getCity,currentCity,addNewCity,deleteCity}}>
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