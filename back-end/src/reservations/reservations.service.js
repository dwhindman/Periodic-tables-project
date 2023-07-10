const knex = require("../db/connection");

function list(date, mobile_number){
    if(date){
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date} )
        .orderBy("reservation_time", "asc");
    }
    if(mobile_number){
        return knex("reservations")
            .select("*")
            .where("mobile_number", "like", `${mobile_number}%`);
    }
    return knex("reservations")
        .select("*");
}

function create(newReservation){
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((createdReservation) => createdReservation[0]);
}

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({"reservation_id": reservation_id})
        .first();
}

function update(updatedReservation){
    return knex("reservations")
        .select("*")
        .where({reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*")
        .then((createdUpdatedReservation) => createdUpdatedReservation[0]);
}

function search(mobile_number){
    return knex("reservations")
        .where("mobile_number", "like", `%${mobile_number}%`)
        .orderBy("reservation_time");
}

module.exports = {
    list,
    create,
    read,
    update,
    search,
}