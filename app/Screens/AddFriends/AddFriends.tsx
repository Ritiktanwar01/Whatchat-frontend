import { View, Text, ScrollView } from 'react-native'
import { fetchFilteredContacts, FormattedContact,BackendContact } from '../../../hooks/AddFriends';
import ChatComponent from '../../../Components/Chat/Chat'
import React, { useEffect, useState } from 'react'

const AddFriends = () => {
    const [contactsList, setContactsList] = useState<BackendContact[]>([]);
    const user = {
        name: 'Aarav Sharma',
        avatar: require('../../../assets/dummy.jpg'),
        lastMessage: 'Hey! Are we still meeting today?',
        time: '3:42 PM',
        isOnline: true,
    }

    useEffect(() => {
        const syncContacts = async () => {
            const matchedContacts = await fetchFilteredContacts();
            console.log('Contacts matched with backend:', matchedContacts);
            setContactsList(matchedContacts);
        };

        syncContacts();
    }, []);
    return (
        <ScrollView className='w-full h-full pt-[10%]'>
            {
                contactsList.map((contact, index) => {
                    return (
                        <ChatComponent key={index} user={contact} />
                    )
                })
            }
        </ScrollView>
    )
}

export default AddFriends