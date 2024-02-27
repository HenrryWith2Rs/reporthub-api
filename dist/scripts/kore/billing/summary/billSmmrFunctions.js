"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeBillSmmrData = void 0;
const billSmmrMock_1 = require("./billSmmrMock");
// Function to randomize data
function randomizeBillSmmrData() {
    // Get the JSON data
    const data = (0, billSmmrMock_1.billSmmrDummyData)();
    for (let item of data) {
        if (typeof item.Result === 'number' ||
            (typeof item.Result === 'string' && !isNaN(Number(item.Result)))) {
            // Randomizing Result within -10% and +10%
            let result = typeof item.Result === 'number'
                ? item.Result
                : parseInt(item.Result);
            let percentageChangeResult = result * getRandomArbitrary(-0.1, 0.1);
            item.Result = Math.round(result + percentageChangeResult);
        }
        if (typeof item.Percentage === 'number' ||
            (typeof item.Percentage === 'string' && !isNaN(Number(item.Percentage)))) {
            // Randomizing Percentage within -5% and +5%
            if (item.Percentage !== '' && item.Percentage !== '100') {
                let percentage = typeof item.Percentage === 'number'
                    ? item.Percentage
                    : parseFloat(item.Percentage);
                let percentageChangePercentage = percentage * getRandomArbitrary(-0.05, 0.05);
                item.Percentage = (percentage + percentageChangePercentage).toFixed(2);
            }
        }
    }
    return data;
}
exports.randomizeBillSmmrData = randomizeBillSmmrData;
// Function to get a random number between min and max
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=billSmmrFunctions.js.map