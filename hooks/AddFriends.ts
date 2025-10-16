import { PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import { API_BASE_URL } from './ServerConf';

export interface FormattedContact {
  name: string;
  number: string;
}

export interface BackendContact {
  profilePicture: string;
  mobile: string;
  email: string;
  name?: string; // Injected from local contacts
}

export const fetchFilteredContacts = async (): Promise<BackendContact[]> => {
  const requestContactsPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'ZappChat needs access to your contacts to sync friends.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const permissionGranted = await requestContactsPermission();
  if (!permissionGranted) {
    // console.warn('Contacts permission denied');
    return [];
  }

  try {
    const deviceContacts = await Contacts.getAll();

    // Format local contacts: name + cleaned number (last 10 digits)
    const formattedContacts: FormattedContact[] = deviceContacts
      .filter(contact => contact.phoneNumbers.length > 0)
      .map(contact => {
        const rawNumber = contact.phoneNumbers[0]?.number ?? '';
        const cleanedNumber = rawNumber.replace(/\D/g, '');
        const localNumber = cleanedNumber.length > 10 ? cleanedNumber.slice(-10) : cleanedNumber;

        return {
          name: contact.displayName ?? '',
          number: localNumber,
        };
      });

    // Prepare payload: only mobile numbers
    const contactList = formattedContacts.map(c => c.number);

    const response = await fetch(`${API_BASE_URL}/searchfriend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactList }), // ✅ only mobile numbers
    });

    const backendData = await response.json();
    const backendContacts: BackendContact[] = backendData.friendId;

    // Inject name from local contacts
    const enrichedContacts = backendContacts.map(contact => {
      const backendNum = contact.mobile.replace(/\D/g, '').slice(-10);
      const match = formattedContacts.find(local => local.number === backendNum);
      return {
        ...contact,
        name: match?.name ?? '',
      };
    });

    // console.log('Enriched contacts:', enrichedContacts);
    return enrichedContacts;
  } catch (error) {
    // console.error('Error fetching or syncing contacts:', error);
    return [];
  }
};
