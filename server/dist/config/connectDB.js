"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.default = async () => {
    await mongoose.connect('mongodb+srv://bluecomet:qkrwlstjd1994@mmastrangelo1120.zooqm3j.mongodb.net/')
        .then(() => console.log('MongoDB Connected.'))
        .catch(error => console.log(error));
};
//# sourceMappingURL=connectDB.js.map