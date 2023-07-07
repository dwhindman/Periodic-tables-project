import React, { useEffect, useState } from "react";
import { listReservations, updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "../Reservations/ListReservations";
import NavBtns from "./NavBtns";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const filterResults = true;

  const [reservations, setReservations] = useState([]);
  const [resError, setResError] = useState(null);

  useEffect( loadDashboard, [date]);

  function loadDashboard(){
    const abortController = new AbortController();
    setResError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setResError);

    return () => abortController.abort();
  }

  const cancelHandler = (event) => {
    const result = window.confirm("Do you want to cancel this reservation?");
      if(result){
          updateStatus(event.target.value, "cancelled");
          loadDashboard();
      }
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={resError} />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations on {date}</h4>
      </div>
      <ListReservations reservations={reservations} filterResults={filterResults} cancelHandler={cancelHandler} />      
      <NavBtns currentDate={date} />


    </main>
  );
}

export default Dashboard;