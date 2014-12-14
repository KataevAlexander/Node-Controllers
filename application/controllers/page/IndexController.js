var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ControllerImpl = require('application/core/controller/ControllerImpl');
var IndexController = (function (_super) {
    __extends(IndexController, _super);
    function IndexController() {
        _super.apply(this, arguments);
    }
    IndexController.prototype.get = function (request, response) {
        response.send('hello index node');
    };
    IndexController.prototype.post = function () {
        //this.get();
    };
    return IndexController;
})(ControllerImpl);
module.exports = ControllerImpl;
