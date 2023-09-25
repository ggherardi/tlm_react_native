import PushNotification, { Importance } from 'react-native-push-notification'
import { Constants } from './Constants';

PushNotification.createChannel(
  {
    channelId: Constants.NotificationChannel.Reminder,
    channelName: Constants.NotificationChannel.Reminder,    
    playSound: true,
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

export const LocalNotification = () => {
  PushNotification.localNotification({
    channelId: '5555',    
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: ["Yes", "No"]
  })
}