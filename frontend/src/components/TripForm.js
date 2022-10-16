import {  useRef, useState } from "react";
import { useAddTrip } from "../hooks/useAddTrip";

const TripForm = () => {
  const picture = useRef('')
  const location = useRef('')
  const description = useRef('')
  const price = useRef(0)
  const [fromDate,setFromDate] = useState('')
  const [toDate,setToDate] = useState('')
  const {addTrip,error,isloading,emptyFields}=useAddTrip()
  const handleSubmit =  (e) => {
    e.preventDefault()
    addTrip( description.current.value,location.current.value,picture.current.value,price.current.value,fromDate,toDate);
  }
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Trip</h3>

      <label>picture :</label>
      <input
        type="text"
        ref={picture}
        className={emptyFields.includes('picture') ? 'error' : ''}
      />
      <label>location :</label>
      <input
        type="text"
        ref={location}
        className={emptyFields.includes('location') ? 'error' : ''}
      />
      <label>description :</label>
      <input
        type="text"
        ref={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />
            <label>price :</label>
      <input
        type="number"
        ref={price}
        className={emptyFields.includes('price') ? 'error' : ''}
      />
      <label>fromDate :</label>
      <input
        type="date"
        onChange={(e) => setFromDate(e.target.value)} 
        value={fromDate} 
        className={emptyFields.includes('fromDate') ? 'error' : ''}
      />
      <label>toDate :</label>
      <input
        type="date"
        onChange={(e) => setToDate(e.target.value)} 
        value={toDate}
        className={emptyFields.includes('toDate') ? 'error' : ''}
      />

<button disabled={isloading}>Add Trip</button>
            {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TripForm