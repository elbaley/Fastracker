import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {styles} from './History.styles';
import {ActivityIndicator} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {formatDate} from '../../utils/formatDate';
interface Log {
  date: FirebaseFirestoreTypes.Timestamp;
  duration: number;
  userId: string;
  key: string;
}

export function History(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) {
      throw new Error('User is not authenticated');
    }
    const uid = user.uid;
    const subscriber = firestore()
      .collection('fasting')
      .where('userId', '==', uid)
      .orderBy('date', 'asc')
      .onSnapshot(
        querySnapshot => {
          const fetchedLogs: Log[] = [];
          for (const documentSnapshot of querySnapshot.docs) {
            const data = documentSnapshot.data();
            const log: Log = {
              date: data.date,
              duration: data.duration,
              userId: data.userId,
              key: documentSnapshot.id,
            };
            fetchedLogs.push(log);
          }
          setLogs(fetchedLogs);
          setLoading(false);
        },
        err => {
          console.log('Firebase ERR ❌');
          console.log(err);
        },
      );

    return () => subscriber();
  }, []);

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

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar backgroundColor="#2e2c30" barStyle="light-content" />
      <Calendar
        // Customize the appearance of the calendar
        style={{
          borderWidth: 1,
          borderColor: 'transparent',
          backgroundColor: '#292931',
          height: 350,
        }}
        theme={{
          calendarBackground: '#292931',
          dayTextColor: 'white',
          monthTextColor: 'white',
          arrowColor: '#FF002E',
        }}
        // Callback that gets called when the user selects a day
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Mark specific dates as marked
        markingType="period"
        onMonthChange={month => {
          console.log('Ay degisti', month);
        }}
        onVisibleMonthsChange={month => {
          console.log('Ay visible degisti', month);
        }}
        // markedDates={{
        //   '2023-08-01': {startingDay: true, color: '#FF002E'},
        //   '2023-08-02': {selected: true, color: '#FF002E'},
        //   '2023-08-03': {endingDay: true, color: '#FF002E'},
        // }}
        markedDates={getMarkedDates(logs)}
      />
      <FlatList
        data={logs}
        renderItem={({item}) => {
          const date = item.date.toDate();
          const formattedDate =
            date.getDate() +
            ' ' +
            date.toLocaleDateString('default', {month: 'short'});
          return (
            <View
              style={{
                height: 50,
                flex: 1,
                justifyContent: 'center',
                borderBottomWidth: 2,
              }}>
              <Text style={styles.logText}>
                {formattedDate} - {item.duration}
              </Text>
            </View>
          );
        }}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}
