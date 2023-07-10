import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
export const sendScheduledNotification = async (
  id: string,
  message: string,
  fireDate: Date,
): Promise<void> => {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: fireDate.getTime(),
  };
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'time',
    name: 'Time Channel',
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  await notifee.createTriggerNotification(
    {
      id,
      title: 'Fastracker',
      body: message,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );
};
