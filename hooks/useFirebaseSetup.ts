import { useEffect } from 'react';
import {
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  onTokenRefresh,
  requestPermission,
  AuthorizationStatus,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import { storage } from '../app/utils/MMKVSetup';
import { API_BASE_URL } from './ServerConf';

export function useFirebaseNotifications() {
  useEffect(() => {
    const messaging = getMessaging();

    const iosPermissions: FirebaseMessagingTypes.IOSPermissions = {
      alert: true,
      badge: true,
      sound: true,
    };

    requestPermission(messaging, iosPermissions)
      .then((authStatus: FirebaseMessagingTypes.AuthorizationStatus) => {
        const enabled =
          authStatus === AuthorizationStatus.AUTHORIZED ||
          authStatus === AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Notification permission granted:', authStatus);
          registerDeviceToken(messaging);
        } else {
          console.warn('Notification permission denied');
        }
      })
      .catch(error => {
        console.error('Permission request failed:', error);
      });

    const unsubscribeForeground = onMessage(
      messaging,
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        Alert.alert(
          'New Notification',
          remoteMessage?.notification?.title || 'You have a message'
        );
      }
    );

    getInitialNotification(messaging)
      .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
        if (remoteMessage) {
          console.log('Opened from quit state:', remoteMessage);
        }
      })
      .catch(error => {
        console.error('getInitialNotification error:', error);
      });

    const unsubscribeOpenedApp = onNotificationOpenedApp(
      messaging,
      (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('Opened from background state:', remoteMessage);
      }
    );

    const unsubscribeTokenRefresh = onTokenRefresh(
      messaging,
      (token: string) => {
        console.log('FCM token refreshed:', token);
        // Send to backend if needed
      }
    );

    return () => {
      unsubscribeForeground();
      unsubscribeOpenedApp();
      unsubscribeTokenRefresh();
    };
  }, []);
}

async function registerDeviceToken(messaging: FirebaseMessagingTypes.Module): Promise<void> {
  try {
    const rawAuth = storage.getString('auth');

    if (!rawAuth) {
      console.warn('No auth token found in storage');
      return;
    }

    let accessToken: string;
    try {
      const parsed = JSON.parse(rawAuth).access_token;
      if (typeof parsed === 'string') {
        accessToken = parsed;
      } else {
        console.log(parsed)
        console.warn('Parsed auth token is not a string');
        return;
      }
    } catch (parseError) {
      console.error('Failed to parse auth token:', parseError);
      return;
    }

    const token = await messaging.getToken();
    if (!token || typeof token !== 'string') {
      console.warn('FCM token is invalid or missing');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/fcm-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FCM token registration failed:', errorText);
    }
  } catch (error) {
    console.error('Error during FCM token registration:', error);
  }
}
