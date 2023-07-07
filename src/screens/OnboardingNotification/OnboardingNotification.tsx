import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {styles} from './OnboardingNotification.styles';
import Lottie from 'lottie-react-native';
export function OnboardingNotification({navigation}): JSX.Element {
  useEffect(() => {
    const requestNotificationPermissions = async () => {
      const permissions = await PushNotificationIOS.requestPermissions();
      console.log('Notification Permissions:', permissions);
    };
    setTimeout(() => {
      requestNotificationPermissions();
    }, 3000);
    // clearPersistedState();
  }, []);
  // return (
  //   <SafeAreaView style={styles.container}>
  //     <View>
  //       <Text>Hello! First we need to get notification permission!</Text>
  //     </View>
  //     <Lottie
  //       source={require('../../assets/notificationBell.json')}
  //       autoPlay
  //       loop
  //     />
  //     <TouchableOpacity onPress={() => navigation.navigate('OnboardingTime')}>
  //       <Text>Next page</Text>
  //     </TouchableOpacity>
  //   </SafeAreaView>
  // );

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
