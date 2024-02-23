"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var server_1 = __importDefault(require("./server"));
server_1["default"].listen(3001, function () {
    console.log('Server is running at port 3001');
});
//# sourceMappingURL=index.js.map