import {useAppSelector} from '../../app/store';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import {styles} from './Settings.styles';
import React from 'react';
export function Settings(): JSX.Element {
  const {remainingTime} = useAppSelector(state => state.app);

  return (
    <SafeAreaView style={styles.settingsContainer}>
      <Text>Settings Screen {remainingTime}</Text>
      <View>
        <TextInput keyboardType={'number-pad'}>Fasting time</TextInput>
      </View>
    </SafeAreaView>
  );
}
