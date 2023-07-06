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
            <button type="button" className="btn-primary rounded" onClick={handlePrev}>
                Previous
            </button>

            <button type="button" className="btn-outline-dark rounded" onClick={handleToday}>
                Today
            </button>
            
            <button type="button" className="btn-primary rounded" onClick={handleNext}>
                Next
            </button>
        </>
    )
}

export default NavBtns;