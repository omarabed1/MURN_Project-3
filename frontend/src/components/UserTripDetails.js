import moment from "moment";

const UserTripDetails = ({trip})=>{
    const momentFromDate=moment(trip.fromDate).utc().format('YYYY-MM-DD')
    const momentToDate=moment(trip.toDate).utc().format('YYYY-MM-DD')
    return(
        <div className='parent'>


        <div className="card">
            <h1>{trip.location}</h1>
            <img className='visual' src={trip.picture}/>
            <p><strong>description : </strong>{trip.description}</p>
            <p><strong>Price : </strong>{trip.price}$</p>
            <p>from :{momentFromDate}to:{momentToDate}</p>
            <button>follow</button>
         </div>     
    </div>
    )
}

export default UserTripDetails