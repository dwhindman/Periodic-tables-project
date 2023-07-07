import React from "react"

function ListTables({ tables, finishHandler }){
    return (
        <>
            {tables.map((table) => (
                <div>
                    <div key={table.table_id}>
                        <h3>{table.table_name}</h3>
                        <div>
                            <h5>Sits a party of {table.capacity}</h5>
                            <p data-table-id-status={table.table_id}>
                                {table.reservation_id === null ? "Free" : "Occupied"}
                            </p>
                        </div>
                    </div>
                    <div>
                        {table.reservation_id ? (
                            <button type="button" className="btn-success rounded"
                                data-table-id-finish={table.table_id}
                                onClick={() => finishHandler(table.table_id)}
                                > 
                                Finish
                             </button> 
                             ) : ("")}
                    </div>
                </div>
            ))}
        </>
    )
}

export default ListTables;