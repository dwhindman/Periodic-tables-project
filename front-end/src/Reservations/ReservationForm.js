import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({reservation, submitHandler, handleChange}){
    const history = useHistory();

    return (
        <>
            <h4>Fill out the form below to complete your reservation!</h4>

            <small className="text-danger">*Note: All fields are required</small>

            <form className="rounded" onSubmit={submitHandler}>
                <div>
                <label htmlFor="first_name">First Name:</label>
                    <input id="first_name" 
                    type="text" 
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={reservation.first_name}
                    required={true} />
                </div>
        
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input id="last_name" 
                    type="text" 
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={reservation.last_name}
                    required={true} />
                </div>
        
                <div>
                    <label htmlFor="mobile_number">Mobile Number:</label>
                    <input id="mobile_number" 
                    type="text" 
                    name="mobile_number"
                    pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                    placeholder="xxx-xxx-xxxx"
                    onChange={handleChange}
                    value={reservation.mobile_number}
                    required={true} />
                </div>
                
                <div>
                    <label htmlFor="reservation_date">Reservation Date:</label>
                    <input id="reservation_date"
                    name="reservation_date"
                    type="date" 
                    placeholder="YYYY-MM-DD" 
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={handleChange}
                    value={reservation.reservation_date}
                    required={true} />
                </div>

                <div>
                    <label htmlFor="reservation_time">Reservation Time:</label>
                    <input id="reservation_time" 
                    type="time" 
                    name="reservation_time"
                    placeholder="HH:MM" 
                    pattern="[0-9]{2}:[0-9]{2}"
                    onChange={handleChange}
                    value={reservation.reservation_time}
                    required={true} />
                </div>

                <div>
                    <label htmlFor="people">Number of People:</label>
                    <input id="people" 
                    type="number" 
                    name="people"
                    placeholder="Number of people"
                    min="1"
                    max="10"
                    onChange={handleChange}
                    value={reservation.people}
                    required={true} />
                </div>
            
                <button type="submit" className="btn-outline-success rounded" >Submit</button>
                <button type="button" className="btn-outline-danger rounded" onClick={() => history.go(-1)}>Cancel</button>
            </form>
        </>
    )
}

export default ReservationForm;