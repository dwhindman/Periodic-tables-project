import React, { useState, useEffect } from "react";
import { useParams , useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ResErrors from "./ResErrors";
import ValidateReservation from "./ValidateReservation";


function EditReservation(){
    const history = useHistory();
    const { reservation_id } = useParams();

    const initialResState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0
    };

    const [resErrors, setResErrors] = useState(null);
    const [reservation, setReservation] = useState({...initialResState});

    useEffect(() => {
        const abortController = new AbortController();
        setResErrors(null);
        readReservation(reservation_id, abortController.signal)
            .then(setReservation)
            .catch(setResErrors);

        return () => abortController.abort();
    }, [reservation_id]);

    const handleChange = (event) => {
        if(event.target.name === "people"){
            setReservation({
                ...reservation, 
                [event.target.name]: Number(event.target.value) 
            });
        } else {
            setReservation({
                ...reservation, 
                [event.target.name]: event.target.value 
            });
        }  
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const errors = ValidateReservation(reservation);
        if(errors.length){
            return setResErrors(errors);
        }

        try {
            await updateReservation(reservation, abortController.signal);
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        } catch (error) {
            setResErrors([error]);
        } 

        return () => abortController.abort();
    }

    return (
        <>
            <div>
                <h1>Edit Reservation</h1>
                <ResErrors errors={resErrors} />
            </div>

            <ReservationForm reservation={reservation} submitHandler={submitHandler} handleChange={handleChange} />
        </>
    );
}

export default EditReservation;
