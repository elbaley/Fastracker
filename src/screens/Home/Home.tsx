import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {setAppState} from '../../app/appslice';
import {useAppDispatch, useAppSelector} from '../../app/store';
import Countdown from '../../components/Countdown';
import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';
import Message from '../../components/Message';
import {sendScheduledNotification} from '../../utils/sendScheduledNotification';
import {styles} from './Home.styles';
import notifee from '@notifee/react-native';
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
        if (remainingSecs === 0 || remainingSecs < 0) {
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
            startDate + fastingTime * 1000,
          ).toLocaleString()}`,
        );
        dispatch(
          setAppState({
            endDate: startDate + fastingTime * 1000,
            isStarted: true,
            isFinished: false,
            mode: 'fasting',
          }),
        );
        let notificationDate = new Date(startDate + fastingTime * 1000);
        sendScheduledNotification(
          `${endDate}-fasting`,
          'Fasting completed!',
          notificationDate,
        );
      }
      if (mode === 'fasting') {
        console.log(
          `yemek bitis tarihi: ${new Date(
            startDate + eatingTime * 1000,
          ).toLocaleString()}`,
        );
        dispatch(
          setAppState({
            endDate: startDate + eatingTime * 1000,
            isStarted: true,
            isFinished: false,
            mode: 'eating',
          }),
        );
        let notificationDate = new Date(startDate + eatingTime * 1000);
        sendScheduledNotification(
          `${endDate}eating`,
          'Eating completed!',
          notificationDate,
        );
      }
    } else {
      console.log('Zaten calisiyor su an iptal edelim');
      // cancel state
      dispatch(
        setAppState({
          endDate: null,
          isStarted: false,
          isFinished: true,
          mode: mode === 'fasting' ? 'eating' : 'fasting',
          remainingTime: null,
        }),
      );
      // cancel notification
      notifee.getTriggerNotificationIds().then(ids => {
        notifee.cancelTriggerNotifications(ids);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar backgroundColor="#292931" barStyle="light-content" />
      <Countdown value={remainingTime} mode={mode} />
      <Message mode={mode} finished={isFinished} />
      <TouchableOpacity style={styles.startBtn} onPress={handleStartFast}>
        <Text style={styles.startBtnText}>{isStarted ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
