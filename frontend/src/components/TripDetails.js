import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useDeleteTrip } from '../hooks/useDeleteTrip'
import moment from "moment";
import Modal from 'react-modal';
import { useState } from 'react';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
const TripDetails = ({trip})=>{
  const momentFromDate=moment(trip.fromDate).utc().format('YYYY-MM-DD')
  const momentToDate=moment(trip.toDate).utc().format('YYYY-MM-DD')
  const [modalIsOpen, setIsOpen] = useState(false);
  const [picture,setPicture] = useState(trip.picture)
  const [location,setLocation] = useState(trip.location)
  const [description,setDescription] = useState(trip.description)
  const [price,setPrice] = useState(trip.price)
  const [fromDate,setFromDate] = useState(momentFromDate)
  const [toDate,setToDate] = useState(momentToDate)
  const {deleteTrip}=useDeleteTrip()
    const handleClick = async () => {
      deleteTrip(trip._id,trip.location)
      }
      
      function openModal() {
        setIsOpen(true);
      }    
      function closeModal() {
        setIsOpen(false);
      }
      const editTrip=async()=> {
        const response = await  fetch('/api/trip/' + trip._id, {
          method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({picture,location,description,price,fromDate,toDate}),
        })
        const json = await response.json()
        
        if (response.ok) {
          console.log(json)
          setIsOpen(false);
        }
        if (!response.ok) {
          console.log(json.error)
        }
      }
    return(
      <div className='parent'>


        <div className="card">
            <h1>{trip.location}</h1>
            <img className='visual' src={trip.picture} alt={trip.location}/>
            <p><strong>description : </strong>{trip.description}</p>
            <p><strong>Price : </strong>{trip.price}$</p>
            <p>{formatDistanceToNow(new Date(trip.createdAt), { addSuffix: true })}</p>
            <p>from :{momentFromDate}to:{momentToDate}</p>
            <div className='buttons'>
                     <button onClick={handleClick}>delete</button>
            <button onClick={openModal}>edit</button>     
            </div>

            </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Edit</h2>
        <form>
        <label>picture :</label>
      <input
        type="text"
        onChange={(e) => setPicture(e.target.value)} 
        value={picture}
      />
      <label>location :</label>
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)} 
        value={location}
      />
       <label>description :</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
      />
      <label>price :</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
      />
      <label>fromDate :</label>
      <input
        type="date"
        onChange={(e) => setFromDate(e.target.value)} 
        value={fromDate} 
      />
      <label>toDate :</label>
      <input
        type="date"
        onChange={(e) => setToDate(e.target.value)} 
        value={toDate}
      />
        <button onClick={closeModal}>close</button>
        <button onClick={editTrip}>edit</button>
        </form>
      </Modal>
        </div>
    ) 
}
export default TripDetails