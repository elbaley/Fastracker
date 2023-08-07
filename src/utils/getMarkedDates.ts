import {MarkedDates} from 'react-native-calendars/src/types';
import {Log} from '../screens/History/History';
import {formatDate} from './formatDate';

const getMarkedDates = (logs: Log[]) => {
  const markedDates: MarkedDates = {};

  for (let i = 0; i < logs.length; i++) {
    const date = logs[i].date.toDate();
    // YYYY-MM-DD format
    const dateString = formatDate(date);

    const prevDate = i - 1 >= 0 ? logs[i - 1].date.toDate() : null;
    const nextDate =
      i + 1 <= logs.length - 1 ? logs[i + 1].date.toDate() : null;

    const isStartingDay = prevDate
      ? Math.abs(date.getDate() - prevDate.getDate()) > 1
      : false;
    const isEndingDay = nextDate
      ? nextDate.getDate() - date.getDate() > 1
      : false;

    // check startingDay
    if (i === 0 || isStartingDay) {
      markedDates[dateString] = {
        color: '#FF002E',
        startingDay: true,
      };
    } // check endingDay
    else if (i === logs.length - 1 || isEndingDay) {
      markedDates[dateString] = {
        color: '#FF002E',
        endingDay: true,
      };
    }
    // otherwise add selected
    else if (prevDate && date.getDate() - prevDate.getDate() === 1) {
      markedDates[dateString] = {
        color: '#FF002E',
        selected: true,
      };
    }
  }

  return markedDates;
};

export default getMarkedDates;
