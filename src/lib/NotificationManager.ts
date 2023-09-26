import PushNotification, { Importance, PushNotificationScheduledLocalObject } from 'react-native-push-notification'
import { Constants } from './Constants';
import { PromiseResult } from './models/PromiseResult';
import { Utility } from './Utility';

interface INotificationProps {
  id?: number;
  channel?: string;
  title?: string;
  text: string;
  date: Date;
  when?: number;
}

const defaults: Pick<INotificationProps, 'channel' | 'when'> = {
  channel: Constants.Channels.Reminder.id,
  when: Date.now()
}

const NotificationManager = {
  createChannel: (channelId: string, channelName: string) => {
    PushNotification.createChannel(
      {
        channelId: channelId,
        channelName: channelName,
        playSound: true,
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  },

  getAllChannels: (): Promise<PromiseResult> => {
    return new Promise((resolve, reject) => {
      PushNotification.getChannels((ids) => {
        resolve(new PromiseResult(true, 'Channels retrieved', ids));
      });
    });
  },

  deleteChannel: (channelId: string) => {
    PushNotification.deleteChannel(channelId);
  },

  deleteAllChannels: async () => {
    const getAllChannelsResult = await NotificationManager.getAllChannels();
    const channels = getAllChannelsResult.data;
    for (let i = 0; i < channels.length; i++) {
      console.log("Deleting channel: ", channels[i]);
      PushNotification.deleteChannel(channels[i]);
    }
  },

  getScheduledLocalNotifications: (): Promise<PushNotificationScheduledLocalObject[]> => {
    return new Promise((resolve, reject) => {
      PushNotification.getScheduledLocalNotifications((notifications) => {
        resolve(notifications);        
      });
    });
  },

  cancelScheduledNotification: (id: number) => {
    console.log("Deleting scheduled notification with id: ", id);
    PushNotification.cancelLocalNotification(id.toString());
  },

  cancelAllScheduledNotifications: (ids: number[]) => {
    for (const id of ids) {      
      NotificationManager.cancelScheduledNotification(id);
    }    
  },

  localNotification: (props: INotificationProps): string => {
    const notificationId = Utility.GenerateRandomGuid("");
    props = { ...defaults, ...props };
    PushNotification.localNotification({
      id: notificationId,
      channelId: props.channel,
      when: props.when,
      title: props.title,
      message: props.text,
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: ["Yes", "No"]
    });
    return notificationId;
  },

  scheduleNotification: (props: INotificationProps) => {    
    props = { ...defaults, ...props };
    console.log(`Scheduling notification: `, props)
    PushNotification.localNotificationSchedule({
      id: props.id,
      channelId: props.channel,
      when: props.when,
      title: props.title,
      message: props.text, // (required)
      date: props.date, // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  },
}

export default NotificationManager;