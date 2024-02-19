import * as jsonData from './apptDtldDummyData.json';

interface Item {
  Description: string;
  Result: number | string;
  Cell_Result: string;
  Percentage: number | string;
  Cell_Percentage: string;
  Intent: string;
  Order: number;
}

function randomizeData(data: Item[]): Item[] {
  for (let item of data) {
    if (
      typeof item.Result === 'number' ||
      (typeof item.Result === 'string' && !isNaN(Number(item.Result)))
    ) {
      // Randomizing Result within -7% and +7%
      let result =
        typeof item.Result === 'number' ? item.Result : parseInt(item.Result);
      let percentageChangeResult = result * getRandomArbitrary(-0.07, 0.07);
      item.Result = Math.round(result + percentageChangeResult);
    }

    if (
      typeof item.Percentage === 'number' ||
      (typeof item.Percentage === 'string' && !isNaN(Number(item.Percentage)))
    ) {
      // Randomizing Percentage within -3% and +3%
      if (item.Percentage !== '') {
        let percentage =
          typeof item.Percentage === 'number'
            ? item.Percentage
            : parseFloat(item.Percentage);
        let percentageChangePercentage =
          percentage * getRandomArbitrary(-0.03, 0.03);
        item.Percentage = (percentage + percentageChangePercentage).toFixed(2);
      }
    }
  }
  return data;
}

function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Cast the imported JSON data to the Item[] type
const data: Item[] = jsonData as Item[];

// Randomize the data
const randomizedData = randomizeData(data);
console.log(randomizedData);
