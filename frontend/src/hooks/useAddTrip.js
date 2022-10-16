import { useState } from "react"
import { useTripContext } from "./useTripContext"


export const useAddTrip= ()=>{
    const {dispatch}=useTripContext()
    const [error,setError]= useState(null)
    const [isloading,setIsloading]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])

    const addTrip=async(description,location,picture,price,fromDate,toDate)=>{
        setError(null)
        setIsloading(true)

        const response =await fetch ('/api/trip/create',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ description,location,picture, price,fromDate,toDate })
        })
        const json =await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setIsloading(false)
        }
        if(response.ok){
            setError(null)
            setIsloading(false)
            setEmptyFields([])
            console.log('add new Trip',json);
            dispatch({type:'CREATE_TRIP',payload:json})
        }
    }
    return{addTrip,error,isloading,emptyFields}
}