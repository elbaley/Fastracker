import {StyleSheet, Text} from 'react-native';
import {Mode} from '../app/appslice';
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

const styles = StyleSheet.create({
  messageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Message;
