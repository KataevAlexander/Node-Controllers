import express = require('express');
import ControllerImpl = require('application/core/controller/ControllerImpl');

class IndexController extends ControllerImpl {

    get(request:express.Request, response:express.Response) {
        response.send('hello index node');
    }

    post() {
        //this.get();
    }

}

export = ControllerImpl;