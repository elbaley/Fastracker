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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Direction} from 'react-native-calendars/src/types';
import CircularProgress from 'react-native-circular-progress-indicator';
import getMarkedDates from '../../utils/getMarkedDates';
import {formatDate} from '../../utils/formatDate';
export interface Log {
  date: FirebaseFirestoreTypes.Timestamp;
  duration: number;
  userId: string;
  key: string;
}

export function History(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<Log[]>([]);
  const [currentDate, setCurrentDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

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
            // only add if it is current month
            const logDate = log.date.toDate();
            if (
              logDate.getMonth() === currentDate.month &&
              logDate.getFullYear() === currentDate.year
            ) {
              fetchedLogs.push(log);
            }
          }
          setLogs(fetchedLogs);
          setLoading(false);
        },
        err => {
          console.log(err);
        },
      );

    return () => subscriber();
  }, [currentDate]);

  function renderLog({item}: {item: Log}) {
    const date = item.date.toDate();
    return (
      <View style={styles.logContainer}>
        <CircularProgress
          activeStrokeColor="#FF002E"
          initialValue={0}
          duration={300}
          radius={30}
          value={100}
          maxValue={100}
          activeStrokeWidth={4}
          inActiveStrokeWidth={0}
          showProgressValue={false}
        />
        <View>
          <Text style={styles.logDate}>
            {date.toLocaleDateString('default', {
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text style={styles.logType}>Fasting</Text>
        </View>
        <View style={styles.logDurationContainer}>
          <Text style={styles.logDuration}>{item.duration}</Text>
          <Text style={styles.logUnit}>hours</Text>
        </View>
      </View>
    );
  }
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar backgroundColor="#1a1d20" barStyle="light-content" />
      <FlatList
        data={[...logs].sort((a, b) => b.date.toMillis() - a.date.toMillis())}
        initialNumToRender={4}
        ListHeaderComponent={() => {
          return (
            <Calendar
              // Customize the appearance of the calendar
              style={styles.logCalendar}
              theme={{
                calendarBackground: '#25272b',
                dayTextColor: 'white',
                monthTextColor: 'white',
                arrowColor: '#FF002E',
              }}
              // Mark specific dates as marked
              markingType="period"
              current={formatDate(
                new Date(currentDate.year, currentDate.month),
              )}
              onMonthChange={month => {
                setCurrentDate(oldDate => {
                  return {...oldDate, month: month.month - 1, year: month.year};
                });
              }}
              markedDates={getMarkedDates(logs)}
              hideExtraDays
              enableSwipeMonths
              renderArrow={(direction: Direction) => {
                const iconName =
                  direction === 'right' ? 'chevron-forward' : 'chevron-back';
                return <Ionicons name={iconName} size={24} color={'#FF002E'} />;
              }}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderLog}
      />
    </SafeAreaView>
  );
}
