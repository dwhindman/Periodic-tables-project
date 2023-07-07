import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function NavBtns({ currentDate }){
    const history = useHistory();

    const handlePrev = (event) => {
        event.preventDefault();
        history.push(`/dashboard?date=${previous(currentDate)}`);
    }

    const handleToday = (event) => {
        event.preventDefault();
        history.push(`/dashboard?date=${today()}`);
    }

    const handleNext = (event) => {
        event.preventDefault();
        history.push(`/dashboard?date=${next(currentDate)}`);
    }

    return (
        <>
            <button type="button" className="btn-success rounded" onClick={handlePrev}>
                Previous
            </button>

            <button type="button" className="btn-outline-success rounded" onClick={handleToday}>
                Today
            </button>
            
            <button type="button" className="btn-success rounded" onClick={handleNext}>
                Next
            </button>
        </>
    )
}

export default NavBtns;