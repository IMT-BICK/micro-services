"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_json_1 = __importDefault(require("./users.json"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    return res.json(users_json_1.default);
});
router.get('/:name', (req, res) => {
    const name = req.params.name;
    const user = users_json_1.default.find(user => user.name === name);
    return res.json(user);
});
exports.default = router;
//# sourceMappingURL=users.js.map