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
                        value="table_id"
                        onChange={handleChange}
                        required={true}
                        >
                            <option value="">Select a Table</option>
                            {tables.map((table) => (
                                <option key={table.table_id}
                                    value={table.table_id}
                                    disabled={table.capacity < reservation.people || table.occupied }
                                    >
                                        Table: {table.table_name} Capacity: {table.capacity}
                                    </option>
                            ))}
                        </select>
                </div>
                <div>
                    <button type="submit">
                        Submit
                    </button>
                    <button type="button" onClick={() => history.go(-1)}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}

export default SeatReservation;