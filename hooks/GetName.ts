import { PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';

export const requestContactsPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts Permission',
        message: 'ZappChat needs access to your contacts to find friends.',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export interface BackendContact {
  profilePicture: string;
  mobile: string;
  email: string;
  name?: string; // Injected from local contacts
}

const normalizePhone = (phone: string) =>
  phone.replace(/\D/g, '').slice(-10); // Keep last 10 digits

export const findLocalNameForContact = async (
  backendContact: BackendContact
): Promise<string | null> => {
  try {
    const deviceContacts = await Contacts.getAll();
    const backendNumber = normalizePhone(backendContact.mobile);

    for (const contact of deviceContacts) {
      for (const phone of contact.phoneNumbers) {
        const localNumber = normalizePhone(phone.number);
        if (localNumber === backendNumber) {
          return contact.displayName || contact.givenName || null;
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error matching contact:', error);
    return null;
  }
};
