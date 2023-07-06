import PushNotificationIOS from '@react-native-community/push-notification-ios';
export const sendScheduledNotification = (
  id: string,
  message: string,
  fireDate: Date,
): void => {
  const request = {
    id: id,
    title: 'Fastracker',
    body: message,
    fireDate: fireDate,
  };
  PushNotificationIOS.addNotificationRequest(request);
};
