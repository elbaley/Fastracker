import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {setFastingTime, setEatingTime} from '../../app/appslice';
import TimePickerModal from '../../components/TimePickerModal';
import {styles} from './OnboardingTime.styles';
export function OnboardingTime({navigation}): JSX.Element {
  const {fastingTime, eatingTime} = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>
          Now let's set your Fasting / Eating time!
        </Text>
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
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('AppScreen')}>
        <Text style={styles.nextButtonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
