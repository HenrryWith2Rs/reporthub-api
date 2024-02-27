"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeApptDtldData = void 0;
const apptDtldMock_1 = require("./apptDtldMock");
// Function to randomize data
function randomizeApptDtldData() {
    // Get the JSON data
    const data = (0, apptDtldMock_1.apptDtldDummyData)();
    for (let item of data) {
        if (typeof item.Result === 'number' ||
            (typeof item.Result === 'string' && !isNaN(Number(item.Result)))) {
            // Randomizing Result within -7% and +7%
            let result = typeof item.Result === 'number'
                ? item.Result
                : parseInt(item.Result);
            let percentageChangeResult = result * getRandomArbitrary(-0.07, 0.07);
            item.Result = Math.round(result + percentageChangeResult);
        }
        if (typeof item.Percentage === 'number' ||
            (typeof item.Percentage === 'string' && !isNaN(Number(item.Percentage)))) {
            // Randomizing Percentage within -3% and +3%
            if (item.Percentage !== '' && item.Percentage !== '100') {
                let percentage = typeof item.Percentage === 'number'
                    ? item.Percentage
                    : parseFloat(item.Percentage);
                let percentageChangePercentage = percentage * getRandomArbitrary(-0.03, 0.03);
                item.Percentage = (percentage + percentageChangePercentage).toFixed(2);
            }
        }
    }
    return data;
}
exports.randomizeApptDtldData = randomizeApptDtldData;
// Function to get a random number between min and max
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=apptDtldFunctions.js.map