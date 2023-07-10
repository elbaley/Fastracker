import {useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {styles} from './OnboardingNotification.styles';
import Lottie from 'lottie-react-native';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
export function OnboardingNotification({navigation}): JSX.Element {
  useEffect(() => {
    const requestNotificationPermissions = async () => {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
        // TODO DENIED
      } else if (
        settings.authorizationStatus === AuthorizationStatus.AUTHORIZED
      ) {
        console.log('User granted permissions request');
      } else if (
        settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
      ) {
        console.log('User provisionally granted permissions request');
      }
      await notifee.requestPermission();
    };
    setTimeout(() => {
      requestNotificationPermissions();
    }, 3000);
    // clearPersistedState();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {
            'Hi there!\nBefore we get started, we need your permission to send notifications.'
          }
        </Text>
      </View>
      <View style={styles.animationContainer}>
        <Lottie
          source={require('../../assets/notificationBell.json')}
          autoPlay
          loop
        />
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('OnboardingTime')}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
