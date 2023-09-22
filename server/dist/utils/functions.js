"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEndDate = void 0;
const dayUnit = 1000 * 60 * 60 * 24;
const hourUnit = dayUnit / 24;
const minuteUnit = hourUnit / 60;
const secondUnit = minuteUnit / 60;
function calculateEndDate(delayTime) {
    const nowDate = new Date().getTime();
    return nowDate + (delayTime * hourUnit);
}
exports.calculateEndDate = calculateEndDate;
//# sourceMappingURL=functions.js.map