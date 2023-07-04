import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Mode} from '../app/appslice';
import {CircularProgressBase} from 'react-native-circular-progress-indicator/';

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
  textContainer: {
    padding: 16,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Countdown;
