import express = require('express');

interface Controller {

    get(request:express.Request, response:express.Response);

    post(request:express.Request, response:express.Response);
    
    put(request:express.Request, response:express.Response);
    
    delete(request:express.Request, response:express.Response);

    before(request:express.Request, app:express.Application);

    after(request:express.Request, response:express.Response, app:express.Application);

}

export = Controller;