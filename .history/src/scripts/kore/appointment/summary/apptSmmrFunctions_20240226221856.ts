import { apptSmmrDummyData } from './apptSmmrMock';
import { QuerySmmrItem } from 'types/commonTypes';

// Function to randomize data
export function randomizeApptSmmrData(): QuerySmmrItem[] {
  // Get the JSON data
  const data: QuerySmmrItem[] = apptSmmrDummyData();
  for (let item of data) {
    if (
      typeof item.Result === 'number' ||
      (typeof item.Result === 'string' && !isNaN(Number(item.Result)))
    ) {
      // Randomizing Result within -7% and +7%
      let result =
        typeof item.Result === 'number'
          ? item.Result
          : parseInt(item.Result as string);
      let percentageChangeResult = result * getRandomArbitrary(-0.07, 0.07);
      item.Result = Math.round(result + percentageChangeResult);
    }

    if (
      typeof item.Percentage === 'number' ||
      (typeof item.Percentage === 'string' && !isNaN(Number(item.Percentage)))
    ) {
      // Randomizing Percentage within -3% and +3%
      if (item.Percentage !== '' && item.Percentage !== '100') {
        let percentage =
          typeof item.Percentage === 'number'
            ? item.Percentage
            : parseFloat(item.Percentage as string);
        let percentageChangePercentage =
          percentage * getRandomArbitrary(-0.03, 0.03);
        item.Percentage = (percentage + percentageChangePercentage).toFixed(2);
      }
    }
  }
  return data;
}

// Function to get a random number between min and max
function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
