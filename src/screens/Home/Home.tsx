import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {Mode, setAppState} from '../../app/appslice';
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
    // console.log('Home state ✅✅✅');
    // console.log({endDate, isStarted, isFinished});
    const calculateRemainingTime = (end: number) => {
      const now = Date.now();
      return Math.ceil((end - now) / 1000);
    };

    let interval: NodeJS.Timeout | null = null;

    if (isStarted && endDate) {
      interval = setInterval(() => {
        const remainingSecs = calculateRemainingTime(endDate);
        // sesion finished
        if (remainingSecs === 0 || remainingSecs < 0) {
          // fasting session finished
          if (mode === 'fasting') {
            dispatch(
              setAppState({
                remainingTime: 0,
                isStarted: false,
                isFinished: true,
                showSaveFastingModal: true,
              }),
            );
          } else {
            // eating session finished
            dispatch(
              setAppState({
                remainingTime: 0,
                isStarted: false,
                isFinished: true,
              }),
            );
          }
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
  }, [dispatch, endDate, isStarted, mode]);

  const handleFastCompletion = () => {
    const startDate = Date.now();
    let newMode: Mode;

    if (mode === 'normal' || mode === 'eating') {
      newMode = 'fasting';
      sendScheduledNotification(
        `${endDate}-fasting`,
        'Fasting completed!',
        new Date(startDate + fastingTime * 1000),
      );
    } else {
      newMode = 'eating';
      sendScheduledNotification(
        `${endDate}-eating`,
        'Eating completed!',
        new Date(startDate + eatingTime * 1000),
      );
    }

    dispatch(
      setAppState({
        endDate:
          startDate + (newMode === 'fasting' ? fastingTime : eatingTime) * 1000,
        isStarted: true,
        isFinished: false,
        mode: newMode,
      }),
    );
  };

  const cancelFast = () => {
    dispatch(
      setAppState({
        endDate: null,
        isStarted: false,
        isFinished: true,
        mode: mode === 'fasting' ? 'eating' : 'fasting',
        remainingTime: null,
      }),
    );
    // cancel notifications
    notifee.getTriggerNotificationIds().then(ids => {
      notifee.cancelTriggerNotifications(ids);
    });
  };

  const handleStartFast = () => {
    if (!isStarted) {
      handleFastCompletion();
    } else {
      cancelFast();
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
