import React, { useState } from "react";
import { listReservations, updateStatus } from "../utils/api";
import ListReservations from "../Reservations/ListReservations";

function Search(){
    const [reservations, setReservations] = useState([]);
    const [mobileNum, setMobileNum] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const filterResults = false;

    const handleChange = (event) => {
        setMobileNum(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();

        let response = await listReservations({ mobile_number: mobileNum }, abortController.signal );
        await setReservations(response);
        setSubmitted(true);

        return () => abortController.abort();
    }

    const cancelHandler = async (event) => {
        const abortController = new AbortController();
        const result = window.confirm("Do you want to cancel this reservation?");

        if(result){
            await updateStatus(event.target.value, "cancelled");
            let response = await listReservations(
                {mobile_number: mobileNum}, abortController.signal
            );

            await setReservations(response);
            setSubmitted(true);
        }

        return () => abortController.abort();
    };

    return (
        <>
            <h2>Search for a Reservation</h2>
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="mobile_number">Mobile Number</label>
                        <input
                            id="mobile_number"
                            name="mobile_number"
                            type="text"
                            placeholder="Enter a customer's phone number"
                            value={mobileNum}
                            maxLength="12"
                            onChange={handleChange}
                            />
                    </div>

                    <button type="submit">Find</button>
                </form>
            </div>
            {submitted ? (
                <ListReservations reservations={reservations} filterResults={filterResults} cancelHandler={cancelHandler} />
            ) : ("No Reservations Found")}
        </>
    );
};

export default Search;