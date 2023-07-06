import React from "react";
import { Link } from "react-router-dom";

function ListReservations({reservations, cancelHandler, filterResults}){

    function statusCheck(reservation){
        return (reservation.status === "finished" || reservation.status === "cancelled");
    }

    function timeFormat(time){
        let hours = Number(time.split(":")[0]);
        let minutes = Number(time.split(":")[1]);
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours: 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedTime = hours + ":" + minutes + " " + ampm;
        return formattedTime;
    }

    function reservationsList(reservations) {
        if(reservations.length){
            return reservations.map((reservation) => {
                    return filterResults && statusCheck(reservation) ? ("") :
                        (
                        <div className="reservation" key={reservation.reservation_id}>
                            <div>
                                <div>   
                                    <h4>
                                    #:{reservation.reservation_id}: 
                                    {reservation.last_name},
                                    {reservation.first_name}
                                    </h4>
                                    <p>Number of Guests: {reservation.people}</p>
                                </div> 

                                <div>
                                    <h5>Time: {timeFormat(reservation.reservation_time)}</h5>
                                </div>
                                <div>
                                    <p>Contact: {reservation.mobile_number}</p>
                                </div>
                                <div>
                                    Reservation Status: {reservation.status}
                                </div>
                            </div>
                            
                            <div>
                                {reservation.status === "booked" ? (
                                    <div>
                                        <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                                            Seat
                                        </Link>
                                        <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                                            Edit
                                        </Link>
                                        <button type="button" 
                                        data-reservation-id-cancel={reservation.reservation_id}
                                        value={reservation.reservation_id}
                                        onClick={cancelHandler}>
                                            Cancel
                                        </button>
                                    </div>
                                ) : ("")}
                            </div>
                                {/* reservation_date={reservation.date}
                                reservation_time={reservation.reservation_time}
                                people={reservation.people}
                                status={reservation.status}
                                setReservationsError={setReservationsError}
                                loadReservations={loadReservations} */}
                        </div>
                        )
                 })
        } else {
            return  <h4>No reservations found</h4>
        }
    }

    return (
        <div>
            {reservationsList(reservations)}
        </div>
        );
}

export default ListReservations;