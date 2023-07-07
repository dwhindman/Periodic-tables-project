import React from "react"

function ListTables({ tables, finishHandler }){
    return (
        <>
            {tables.map((table) => (
                <div>
                    <div key={table.table_id}>
                        <h3>Table {table.table_name}</h3>
                        <div>
                            <h5>Sits a party of {table.capacity}</h5>
                            <p data-table-id-status={table.table_id}>
                                {table.occupied ? "occupied" : "free"}
                            </p>
                        </div>
                    </div>
                    <div>
                        {table.occupied ? (
                            <button className= "finish"
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