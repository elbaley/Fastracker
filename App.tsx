import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {RootState, useAppSelector, useAppDispatch} from './src/app/store';
import {Mode, setAppState} from './src/app/appslice';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CircularProgressBase} from 'react-native-circular-progress-indicator/';
import store from './src/app/store';
import {Provider, useSelector} from 'react-redux';
const FASTING_TIME = 12 * 1000;
const EATING_TIME = 6 * 1000;

type RootTabStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#2e2c30',
              borderTopWidth: 0,
              borderTopColor: 'transparent',
            },
          }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
function Settings(): JSX.Element {
  const {remainingTime} = useSelector((state: RootState) => state.app);

  return (
    <SafeAreaView>
      <Text>Settings Screen {remainingTime}</Text>
    </SafeAreaView>
  );
}

function Home(): JSX.Element {
  const {remainingTime, isFinished, isStarted, endDate, mode} = useAppSelector(
    state => state.app,
  );
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
            startDate + FASTING_TIME,
          ).toLocaleString()}`,
        );
        dispatch(
          setAppState({
            endDate: startDate + FASTING_TIME,
            isStarted: true,
            isFinished: false,
            mode: 'fasting',
          }),
        );

        // old sstate
        // setAppState(prevState => ({
        //   ...prevState,
        //   endDate: startDate + FASTING_TIME,
        //   isStarted: true,
        //   isFinished: false,
        //   mode: 'fasting',
        // }));
      }
      if (mode === 'fasting') {
        console.log(
          `yemek bitis tarihi: ${new Date(
            startDate + EATING_TIME,
          ).toLocaleString()}`,
        );
        dispatch(
          setAppState({
            endDate: startDate + EATING_TIME,
            isStarted: true,
            isFinished: false,
            mode: 'eating',
          }),
        );

        // setAppState(prevState => ({
        //   ...prevState,
        //   endDate: startDate + EATING_TIME,
        //   isStarted: true,
        //   isFinished: false,
        //   mode: 'eating',
        // }));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Countdown value={remainingTime} mode={mode} />
      <Message mode={mode as Mode} finished={isFinished} />
      <TouchableOpacity
        style={styles.startBtn}
        onPress={handleStartFast}
        disabled={isStarted}>
        <Text style={styles.startBtnText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Countdown = ({value, mode}: any): JSX.Element => {
  function secondsToTimeString(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainderSecs = seconds % 60;

    const formatNumber = (num: number) => (num <= 9 ? `0${num}` : `${num}`);

    const timeString = `${formatNumber(hours)}:${formatNumber(
      minutes,
    )}:${formatNumber(remainderSecs)}`;

    return timeString;
  }
  const calculatePercentage = (
    currentValue: number,
    currentMode: Mode,
  ): number => {
    if (currentMode === 'eating') {
      const percent = Math.floor((currentValue / 6) * 100);
      console.log(`${percent} dönüyom`);
      return percent;
    }
    if (currentMode === 'fasting') {
      const percent = Math.floor((currentValue / 12) * 100);
      console.log(`${percent} dönüyom`);

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
      <CircularProgressBase
        startInPausedState={false}
        initialValue={0}
        clockwise={false}
        value={calculatePercentage(value, mode)}
        radius={120}
        activeStrokeColor="gray"
        inActiveStrokeColor="#FF002E"
        maxValue={100}
        children={
          <Text style={styles.textContainer}>{secondsToTimeString(value)}</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 16,
    backgroundColor: '#292931',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    padding: 16,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  startBtn: {
    color: 'white',
    backgroundColor: '#FF002E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  startBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
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
      ? 'Fasting completed 🎉 !\nStart eating period:'
      : 'You are fasting!';
  } else if (mode === 'eating') {
    message = finished
      ? 'Eating period completed!\nStart fasting:'
      : 'You can eat! 🍽️';
  } else {
    message = 'Fasting/Eating not started\nStart fasting';
  }
  return <Text style={styles.messageText}>{message}</Text>;
};

export default App;
