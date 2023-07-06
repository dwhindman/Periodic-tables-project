import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import ResErrors from "./ResErrors";
import ValidateReservation from "./ValidateReservation";

function CreateReservation(){
    const history = useHistory();
    
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
      };

    const [reservation, setReservation] = useState({...initialFormState});
    const [reservationErrors, setReservationsErrors] = useState(null);

    const handleChange = (event) => {
        if(event.target.name === "people"){
            setReservation({
                ...reservation,
                [event.target.name]: Number(event.target.value)
            }); 
        } else{
            setReservation({
            ...reservation,
            [event.target.name]: event.target.value
            });
        }
    };

    const submitHandler =  async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        
        const errors = ValidateReservation(reservation);
        if(errors.length){
            return setReservationsErrors(errors);
        }
        try{
            await createReservation(reservation, abortController.signal)
            history.push(`/dashboard?date=${reservation.reservation_date}`)
        } catch(error) {
            setReservationsErrors([error]);
        }
        return () => abortController.abort();
    };

    return (
        <>
            <div>
                <h2>New Reservation</h2>
                <ResErrors errors={reservationErrors} />
            </div>
            
            <ReservationForm reservation={reservation} submitHandler={submitHandler} handleChange={handleChange} />
        </>
        );
}

export default CreateReservation;