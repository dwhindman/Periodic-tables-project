const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


const VALID_PROPERTIES = [
    "table_name",
    "capacity",
    "reservation_id"
];

async function list(req, res, next){
    const data = await service.list();
    res.json({ data });
}

function hasData(req, res, next){
    if(req.body.data){
        return next();
    }
    next({ status: 400, message: "Body must have data property"});
}

function hasValidProperties(req, res, next){
    const { data = {} } = req.body;
    const invalidProperties = Object.keys(data).filter((item) =>
     !VALID_PROPERTIES.includes(item));
     if(invalidProperties.length){
      return next({status: 400, message: `Invalid item(s): ${invalidProperties.join(", ")}`});
     }
     next();
}

function hasProperties(...properties){
    return function(req, res, next){
      const { data = {} } = req.body;
      try{
        properties.forEach((property) => {
          if(!data[property]){
            const error = new Error(`${property} is required.`);
            error.status = 400;
            throw error;
          }
        });
        next();
      } catch(error){
        next(error);
      }
    };
  }

  function validTableName(req, res, next){
    const { table_name } = req.body.data;
    if(table_name.length < 2){
        next({status: 400, message: "table_name must be atleast 2 characters long"});
    }
    next();
  }

  function validCapacity(req, res, next){
    const { capacity } = req.body.data;
    if( capacity < 1 || typeof capacity !== "number"){
        return next({status: 400, message: "'capacity' must be a number greater than zero."});
    }
    next();
  }

  async function create(req, res, next){
    const data = await service.create(req.body.data);
    res.status(201).json({ data: data });
  }

  async function tableExists(req, res, next){
    const table_id = req.params.table_id;
    const table = await service.read(table_id);
    if(table){
        res.locals.table = table;
        return next();
    }
    next({status: 404, message: `Table ${table_id} does not exist.`})
  }

  async function reservationExists(req, res, next){
    const { reservation_id } = req.body.data;
    const reservation = await service.readReservation(reservation_id);
    if(reservation){
        res.locals.reservation = reservation;
        return next();
    }
    next({ status: 404, message: `Reservation ${reservation_id} does not exist`});
  }

  function sufficientCapacity(req, res, next){
    const people = res.locals.reservation.people;
    const capacity = res.locals.table.capacity;
    if(people > capacity) {
        return next({ status: 400, message: "Table capacity is not large enough for this party"});
    }
    next();
  }

  function occupiedTable(req, res, next){
    const reservation_id = res.locals.table.reservation_id;
    if(reservation_id){
        return next({ status: 400, message: "Table is occupied"});
    }
    next();
  }

  function unoccupiedTable(req, res, next){
    const reservation_id = res.locals.table.reservation_id;
    if(!reservation_id){
      return next({ status: 400, message: "Table is not occupied"});
    }
    next();
  }

  function reservationAlreadySeated(req, res, next){
    const currentStatus = res.locals.reservation.status;
    if(currentStatus && currentStatus === "seated"){
        return next({ status: 400, message: "Reservation is already seated"});
    }
    next();
  }

  async function sitReservation(req, res){
    const updatedTable = {...req.body.data, table_id: res.locals.table.table_id };
    const updatedReservation = {...res.locals.reservation, status: "seated"};
    const data = await service.update(updatedTable, updatedReservation);
    res.json({ data });
  }

  async function getReservation(req, res, next){
    const reservation_id = res.locals.table.reservation_id;
    const reservation = await service.readReservation(reservation_id);
    if(reservation){
      res.locals.reservation = reservation;
      return next();
    }
    next({ status: 404, message: `Reservation ${reservation_id} not found`})
  }

  async function deleteReservation(req, res){
    const table = res.locals.table;
    const updatedTable = {
      ...table,
      reservation_id: null
    }
  const updatedReservation = {
    ...res.locals.reservation,
      reservation_id: res.locals.reservation.reservation_id,
      status: "finished"
  }
    const data = await service.update(updatedTable, updatedReservation);
    res.json({ data });
  }

module.exports = {
    create: [hasData, 
        hasValidProperties,
        hasProperties("table_name", "capacity"),
        validTableName,
        validCapacity,
        asyncErrorBoundary(create) ],
    list: asyncErrorBoundary(list),
    sitReservation: [
        asyncErrorBoundary(tableExists),
        hasData,
        hasProperties("reservation_id"),
        asyncErrorBoundary(reservationExists),
        reservationAlreadySeated,
        sufficientCapacity,
        occupiedTable,
        asyncErrorBoundary(sitReservation)],
    deleteReservation: [
      asyncErrorBoundary(tableExists),
      unoccupiedTable,
      asyncErrorBoundary(getReservation),
      asyncErrorBoundary(deleteReservation)
    ]
}