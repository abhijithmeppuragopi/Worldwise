import { useSearchParams } from "react-router-dom";

export function useUrlPosition(){
    const[searchItem]=useSearchParams();
    const mapLat=searchItem.get("lat");
     const mapLng=searchItem.get("lng");
     return {mapLat,mapLng}
}