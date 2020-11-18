"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var uuidv4_1 = require("uuidv4");
var appointmentsRoutes = express_1.Router();
var appointments = [];
//localhost:3333/appointments
appointmentsRoutes.post('/', function (request, response) {
    var _a = request.body, provider = _a.provider, date = _a.date;
    var appointment = {
        provider: provider,
        date: date,
        id: uuidv4_1.uuid()
    };
    appointments.push(appointment);
    response.json(appointment);
});
exports.default = appointmentsRoutes;
