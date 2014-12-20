//import refs = require('application/refs');
//import express = require('express');
import Controller = require("application/core/controller/Controller");
import Model = require("application/core/model/Model");

class ControllerImpl implements Controller {

    //protected
    model:Model;

    get(request:Express.Request, response:express.Response) {
    }

}

export = ControllerImpl