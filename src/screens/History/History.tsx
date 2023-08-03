import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {styles} from './History.styles';
import {ActivityIndicator} from 'react-native';

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
      .onSnapshot(querySnapshot => {
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
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar backgroundColor="#2e2c30" barStyle="light-content" />
      <FlatList
        data={logs}
        renderItem={({item}) => {
          console.log(item);
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
              <Text style={styles.logText}>{formattedDate}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}
