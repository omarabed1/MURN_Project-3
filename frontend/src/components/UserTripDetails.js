import moment from "moment";
import { useState,useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
const UserTripDetails = ({trip})=>{
    const momentFromDate=moment(trip.fromDate).utc().format('YYYY-MM-DD')
    const momentToDate=moment(trip.toDate).utc().format('YYYY-MM-DD')
    const [follow,setFollow]=useState(false)
    const {user}=useUserContext()
    const handleClick=async()=>{
          const response =await  fetch('/api/follow/' + trip.location)
          const json = await response.json()
          if(follow===false)
          {
            const response1 =  await  fetch('/api/user/follow/' + user.userName, {
              method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  followers:[trip._id,...user.followers],
              }),
            })
            const json1 = await response1.json()
            await  fetch('/api/follow/' + trip.location, {
              method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  followers:json.followers+1,
              }),
            })
            console.log(json1);
           setFollow(true)
          }
          if(follow===true)
          {
            const result = user.followers.filter(followers => followers!==trip._id);
            await  fetch('/api/user/follow/' + user.userName, {
              method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  followers:result,
              }),
            })
            await  fetch('/api/follow/' + trip.location, {
              method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  followers:json.followers-1
              }),
            })
            setFollow(false)
          }
    }
    useEffect(()=>{
        for(let i=0;i<user.followers.length ;i++){
            if(trip._id===user.followers[i])
            setFollow(true)
        }
    },[user,trip._id])
    return(
        <div className='parent'>

        <div className="card">
            <h1>{trip.location}</h1>
            <img className='visual' src={trip.picture} alt={trip.location}/>
            <p><strong>description : </strong>{trip.description}</p>
            <p><strong>Price : </strong>{trip.price}$</p>
            <p>from :{momentFromDate}to:{momentToDate}</p>
            {follow===false && <button onClick={handleClick}>follow</button>}
            {follow===true && <button onClick={handleClick} className="follow">unfollow</button>}
         </div>     
    </div>
    )
}

export default UserTripDetails