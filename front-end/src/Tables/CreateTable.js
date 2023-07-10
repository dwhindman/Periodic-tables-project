import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableErrors from "./TableErrors";

function CreateTable(){
    const history = useHistory();
    const initialTableState = {
        table_name: "",
        capacity: 0
    };
    const [table, setTable] = useState({...initialTableState});
    const [tableErrors, setTableErrors] = useState(null);

    const handleChange = (event) => {
        if(event.target.name === "capacity"){
            setTable({
                ...table,
                [event.target.name]: Number(event.target.value)
            });
        } else {
            setTable({
                ...table,
                [event.target.name]: event.target.value
            });
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        createTable(table, abortController.signal)
            .then(history.push(`/dashboard`))
            .catch(setTableErrors);

        return () => abortController.abort();
    };

    return (
        <>
            <h2>Create a Table</h2>
            <TableErrors errors={tableErrors} />

            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="table_name">Table Name:</label>
                    <input id="table_name"
                        name="table_name"
                        type="text"
                        value={table.table_name}
                        placeholder="Name of table"
                        minLength="2"
                        onChange={handleChange}
                        required={true}
                        />
                </div>
                <div>
                    <label htmlFor="capacity">Capacity:</label>
                    <input id="capacity"
                        name="capacity"
                        type="number"
                        value={table.capacity}
                        placeholder="capacity"
                        min={1}
                        onChange={handleChange}
                        required={true}
                        />
                </div>
                <div>
                    <button className="btn-outline-success rounded" type="submit">
                        Submit
                    </button>
                    <button className="btn-outline-danger rounded" type="button" onClick={() => history.go(-1)}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateTable;