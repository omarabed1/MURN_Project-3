import { useTripContext } from "./useTripContext"
import { useUserContext } from "./useUserContext"


export const useDeleteTrip=()=>{
    const {dispatch}=useTripContext()
    const {user}=useUserContext()

    const deleteTrip =async (id,location)=>{
        if(!user){
            return
        }
        const response = await fetch('/api/trip/' + id, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
          const response1 = await fetch('/api/follow/' + location, {
            method: 'DELETE',
          })
          const json = await response.json()
      
          if (response.ok&&response1.ok) {
            dispatch({type: 'DELETE_TRIP', payload: json})
          }
    }
    return{deleteTrip}
}