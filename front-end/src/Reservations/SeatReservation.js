import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {listTables, updateTable, readReservation } from "../utils/api";

function SeatReservation(){
    const history = useHistory();
    const { reservation_id } = useParams();
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState("");
    const [reservation, setReservation] = useState({});

    useEffect(() => {
        listTables()
            .then(setTables);
    }, []);

    useEffect(() => {
        readReservation(reservation_id)
            .then(setReservation);
    }, [reservation_id]);

    const handleChange = (event) => {
        setTableId(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        await updateTable(reservation.reservation_id, tableId);
        history.push("/dashboard");
    };

    return (
        <>
            <h2>Seat Reservation</h2>

            <form onSubmit={submitHandler}>
                <div>
                    <select id="table_id"
                        name="table_id"
                        value={tableId}
                        onChange={handleChange}
                        required={true}
                        >
                            <option value="">Select a Table</option>
                            {tables.map((table) => (
                                <option key={table.table_id}
                                    value={table.table_id}
                                    disabled={table.capacity < reservation.people || table.occupied }
                                    >
                                        {table.table_name} - {table.capacity}
                                    </option>
                            ))}
                        </select>
                </div>
                <div>
                    <button className="btn-outline-success rounded" type="submit">
                        Submit
                    </button>
                    <button className="btn-warning rounded" type="button" onClick={() => history.go("./dashboard")}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}

export default SeatReservation;