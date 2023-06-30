import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator/';

const FASTING_TIME = 12 * 1000;
const EATING_TIME = 6 * 1000;

export type Mode = 'normal' | 'fasting' | 'eating';

type AppState = {
  remainingTime: number | null;
  isStarted: boolean;
  isFinished: boolean;
  mode: Mode;
  endDate: number | null;
};

function App(): JSX.Element {
  const [appState, setAppState] = useState<AppState>({
    remainingTime: null,
    isStarted: false,
    isFinished: false,
    mode: 'normal',
    endDate: null,
  });

  useEffect(() => {
    const calculateRemainingTime = (end: number) => {
      const now = Date.now();
      return Math.ceil((end - now) / 1000);
    };

    let interval: NodeJS.Timeout | null = null;
    const {isStarted, endDate} = appState;

    if (isStarted && endDate) {
      interval = setInterval(() => {
        const remainingSecs = calculateRemainingTime(endDate);
        if (remainingSecs === 0) {
          setAppState(prevState => ({
            ...prevState,
            remainingTime: 0,
            isStarted: false,
            isFinished: true,
          }));
        } else {
          setAppState(prevState => ({
            ...prevState,
            remainingTime: remainingSecs,
          }));
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [appState]);

  const handleStartFast = () => {
    const startDate = Date.now();
    const {isStarted, mode} = appState;

    if (!isStarted) {
      if (mode === 'normal' || mode === 'eating') {
        console.log(
          `oruc bitis tarihi: ${new Date(
            startDate + FASTING_TIME,
          ).toLocaleString()}`,
        );
        setAppState(prevState => ({
          ...prevState,
          endDate: startDate + FASTING_TIME,
          isStarted: true,
          isFinished: false,
          mode: 'fasting',
        }));
      }
      if (mode === 'fasting') {
        console.log(
          `yemek bitis tarihi: ${new Date(
            startDate + EATING_TIME,
          ).toLocaleString()}`,
        );
        setAppState(prevState => ({
          ...prevState,
          endDate: startDate + EATING_TIME,
          isStarted: true,
          isFinished: false,
          mode: 'eating',
        }));
      }
    }
  };

  const {remainingTime, isStarted, isFinished, mode} = appState;

  return (
    <SafeAreaView style={styles.container}>
      <Message mode={mode} finished={isFinished} />
      <Button disabled={isStarted} title="Başlat" onPress={handleStartFast} />
      {remainingTime !== null && (
        <Countdown value={remainingTime} mode={mode} />
      )}
      <Text>{remainingTime}</Text>
    </SafeAreaView>
  );
}

const Countdown = ({value, mode}: any): JSX.Element => {
  const calculatePercentage = (
    currentValue: number,
    currentMode: Mode,
  ): number => {
    if (currentMode === 'eating') {
      const percent = Math.floor((currentValue / 6) * 100);
      return percent;
    }
    if (currentMode === 'fasting') {
      const percent = Math.floor((currentValue / 12) * 100);
      return percent;
    }

    return 0;
  };
  useEffect(() => {
    console.log('Countdown render edildi');
    console.log({value, mode});

    return () => {
      console.log('Countdown unmount edildi!!');
    };
  }, [value, mode]);
  return (
    <View>
      <CircularProgress
        startInPausedState={false}
        initialValue={100}
        clockwise={false}
        value={calculatePercentage(value, mode)}
        radius={120}
        progressValueColor={'#ecf0f1'}
        activeStrokeColor={'gray'}
        inActiveStrokeColor={'#2ecc71'}
        maxValue={100}
        title={'%'}
        titleColor={'black'}
        titleStyle={{fontWeight: 'bold'}}
        progressFormatter={() => {
          'worklet';

          return value; // use remainingSeconds as value instead of percentage
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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

export default App;
