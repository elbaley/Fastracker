import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {setAppState} from '../../app/appslice';
import {useAppDispatch, useAppSelector} from '../../app/store';
import Countdown from '../../components/Countdown';
import Message from '../../components/Message';
import {styles} from './Home.styles';
export function Home(): JSX.Element {
  const {
    remainingTime,
    isFinished,
    isStarted,
    endDate,
    mode,
    fastingTime,
    eatingTime,
  } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();
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
          dispatch(
            setAppState({remainingTime: 0, isStarted: false, isFinished: true}),
          );
        } else {
          dispatch(setAppState({remainingTime: remainingSecs}));
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dispatch, endDate, isStarted]);

  const handleStartFast = () => {
    const startDate = Date.now();

    if (!isStarted) {
      if (mode === 'normal' || mode === 'eating') {
        console.log(
          `oruc bitis tarihi: ${new Date(
            startDate + fastingTime,
          ).toLocaleString()}`,
        );
        dispatch(
          setAppState({
            endDate: startDate + fastingTime,
            isStarted: true,
            isFinished: false,
            mode: 'fasting',
          }),
        );
      }
      if (mode === 'fasting') {
        console.log(
          `yemek bitis tarihi: ${new Date(
            startDate + eatingTime,
          ).toLocaleString()}`,
        );
        dispatch(
          setAppState({
            endDate: startDate + eatingTime,
            isStarted: true,
            isFinished: false,
            mode: 'eating',
          }),
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Countdown value={remainingTime} mode={mode} />
      <Message mode={mode} finished={isFinished} />
      <TouchableOpacity
        style={styles.startBtn}
        onPress={handleStartFast}
        disabled={isStarted}>
        <Text style={styles.startBtnText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
