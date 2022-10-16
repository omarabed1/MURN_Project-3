import { useEffect } from "react"
import { useTripContext } from "../hooks/useTripContext"
import { useUserContext } from "../hooks/useUserContext"

import TripFrom from '../components/TripForm'
import TripDetails from '../components/TripDetails'
import UserTripDetails from '../components/UserTripDetails'
const Home=() =>{
    const {trips,dispatch}=useTripContext()
    const {user}=useUserContext()
    useEffect(()=>{
        const fetchTrips = async ()=>{
            const response= await fetch('/api/trip',{
                headers: {'Authorization': `Bearer ${user.token}`}, 
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_TRIPS', payload: json})
            }
        }
        if (user) {
            fetchTrips()
        }
    },[dispatch,user])
    return (
        <div>

       {user.role==='admin' && 
        <div className="home">
            <div className="workouts">
                {trips && trips.map((trip)=>(
                <TripDetails key={trip._id} trip={trip}/>
                ))}
            </div>
            <TripFrom/>

        </div>}
        {user.role==='user' && 
             <div className="workouts">
             {trips && trips.map((trip)=>(
            <UserTripDetails key={trip._id} trip={trip}/>
             ))}
         </div>
        } 
        </div>
    )
}
export default Home

