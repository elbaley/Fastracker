import {BlurView} from '@react-native-community/blur';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, {ToastConfig} from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  blurSuccess: ({text1}) => {
    return (
      <View style={styles.container}>
        <View style={styles.greenBackground} />
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
          blurRadius={25}
          overlayColor={'rgba(0,0,0,0.4)'}
        />
        <Ionicons name={'checkmark-circle'} size={24} color={'#0FE166'} />
        <Text style={styles.text}>{text1}</Text>
      </View>
    );
  },
};

export const CustomToast = () => {
  return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    width: '80%',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
  greenBackground: {
    backgroundColor: 'rgba(15,225,101,0.2)',
    width: '30%',
    height: 50,
    position: 'absolute',
    left: 0,
    borderRadius: 10,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
