import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FASTING_TIME = 16 * 1000;
const EATING_TIME = 8 * 1000;

export type Mode = 'normal' | 'fasting' | 'eating';

function App(): JSX.Element {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [mode, setMode] = useState<Mode>('normal');
  const [endDate, setEndDate] = useState<number | null>(null);

  useEffect(() => {
    const calculateRemainingTime = (end: number) => {
      const now = Date.now();
      return Math.ceil((end - now) / 1000);
    };

    let interval: NodeJS.Timeout | null = null;
    if (isStarted && endDate) {
      interval = setInterval(() => {
        const remainingSecs = calculateRemainingTime(endDate);
        if (remainingSecs === 0) {
          setRemainingTime(0);
          setIsStarted(false);
          setIsFinished(true);
        }
        setRemainingTime(remainingSecs);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [endDate, isStarted, mode]);

  const handleStartFast = () => {
    const startDate = Date.now();
    if (!isStarted) {
      if (mode === 'normal' || mode === 'eating') {
        // start fasting
        console.log(
          `oruc bitis tarihi: ${new Date(
            startDate + FASTING_TIME,
          ).toLocaleString()}`,
        );
        setEndDate(startDate + FASTING_TIME);
        setIsStarted(true);
        setIsFinished(false);
        setMode('fasting');
      }
      if (mode === 'fasting') {
        // start eating
        console.log(
          `yemek bitis tarihi: ${new Date(
            startDate + EATING_TIME,
          ).toLocaleString()}`,
        );
        setEndDate(startDate + EATING_TIME);
        setIsStarted(true);
        setIsFinished(false);
        setMode('eating');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Message mode={mode} finished={isFinished} />
      <Button disabled={isStarted} title="Başlat" onPress={handleStartFast} />
      <Button
        title="write to storage"
        onPress={() => {
          const storeData = async (value: string) => {
            try {
              await AsyncStorage.setItem('my-key', value);
              console.log('basariyla kaydettim');
            } catch (e) {
              // saving error
              console.log(e);
            }
          };
          //
          // storeData('furkan');

          const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('my-key');
              if (value !== null) {
                // value previously stored
                console.log('Daha once kaydedilmis veri :');
                console.log(value);
              }
            } catch (e) {
              // error reading value
            }
          };

          getData();
        }}
      />
      <Text style={styles.remainingTime}>{remainingTime}</Text>
    </SafeAreaView>
  );
}

const Message = ({
  mode,
  finished,
}: {
  mode: Mode;
  finished: boolean;
}): JSX.Element => {
  let message = '';
  if (mode === 'fasting') {
    message = finished
      ? 'Oruç bitti! Yeme süresini başlat:'
      : 'Oruçtasınız! Orucun bitmesine:';
  } else if (mode === 'eating') {
    message = finished
      ? 'Yemek süresi bitti! Oruç süresini başlat:'
      : 'Yemektesiniz! Yemeğin bitmesine:';
  } else {
    message = 'Oruc/Yemek başlamadı. Orucu başlatın.';
  }
  return <Text>{message}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  remainingTime: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default App;
