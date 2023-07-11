import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable, updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "../Reservations/ListReservations";
import ListTables from "../Tables/ListTables";
import NavBtns from "./NavBtns";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const filterResults = true;

  const [reservations, setReservations] = useState([]);
  const [resError, setResError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect( loadDashboard, [date]);

   function loadDashboard(){
    const abortController = new AbortController();
    setResError(null);
     listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setResError);

     listTables()
      .then(setTables);

    return () => abortController.abort();
  }

  async function finishHandler(table_id){
    const abortController = new AbortController();
    const result = window.confirm("Is this table ready to seat new guests?");

    if(result){
      await finishTable(table_id, abortController.signal);
      loadDashboard();
    }

    return () => abortController.abort();
  }

  const cancelHandler = (event) => {
    const result = window.confirm("Do you want to cancel this reservation?");
      if(result){
          updateStatus(event.target.value, "cancelled");
          loadDashboard()
          history.goBack();
      }
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={resError} />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations on {date}</h4>
      </div>
      <div>
        <ListReservations reservations={reservations} filterResults={filterResults} cancelHandler={cancelHandler} />
      </div>
      <div>
        <NavBtns currentDate={date} />
      </div>
      <div>
        <h2>Tables</h2>
        <ListTables tables={tables} finishHandler={finishHandler} />
      </div>


    </main>
  );
}

export default Dashboard;