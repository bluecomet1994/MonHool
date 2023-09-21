"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DASHBOARD_TYPE = exports.TRANSACTION_TYPE = void 0;
var TRANSACTION_TYPE;
(function (TRANSACTION_TYPE) {
    TRANSACTION_TYPE[TRANSACTION_TYPE["EXCHANGE"] = 0] = "EXCHANGE";
    TRANSACTION_TYPE[TRANSACTION_TYPE["DEPOSIT"] = 1] = "DEPOSIT";
    TRANSACTION_TYPE[TRANSACTION_TYPE["WITHDRAWAL"] = 2] = "WITHDRAWAL";
})(TRANSACTION_TYPE || (exports.TRANSACTION_TYPE = TRANSACTION_TYPE = {}));
var DASHBOARD_TYPE;
(function (DASHBOARD_TYPE) {
    DASHBOARD_TYPE[DASHBOARD_TYPE["DAY"] = 1] = "DAY";
    DASHBOARD_TYPE[DASHBOARD_TYPE["WEEK"] = 7] = "WEEK";
    DASHBOARD_TYPE[DASHBOARD_TYPE["MONTH"] = 180] = "MONTH";
    DASHBOARD_TYPE[DASHBOARD_TYPE["YEAR"] = 365] = "YEAR";
    DASHBOARD_TYPE[DASHBOARD_TYPE["ALL"] = 0] = "ALL";
})(DASHBOARD_TYPE || (exports.DASHBOARD_TYPE = DASHBOARD_TYPE = {}));
//# sourceMappingURL=type.js.map