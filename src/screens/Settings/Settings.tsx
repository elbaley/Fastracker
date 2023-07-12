import {useAppDispatch, useAppSelector} from '../../app/store';
import {SafeAreaView, View} from 'react-native';
import {styles} from './Settings.styles';
import {setFastingTime, setEatingTime} from '../../app/appslice';
import TimePickerModal from '../../components/TimePickerModal';
import {FocusAwareStatusBar} from '../../components/FocusAwareStatusBar';
export function Settings(): JSX.Element {
  const {fastingTime, eatingTime} = useAppSelector(state => state.app);

  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.settingsContainer}>
      <FocusAwareStatusBar backgroundColor="#2e2c30" barStyle="light-content" />
      <View>
        <TimePickerModal
          selectedTime={fastingTime}
          label={'Fasting'}
          onChangeTime={time => dispatch(setFastingTime(time))}
        />
        <TimePickerModal
          selectedTime={eatingTime}
          label={'Eating'}
          onChangeTime={time => dispatch(setEatingTime(time))}
        />
      </View>
    </SafeAreaView>
  );
}
