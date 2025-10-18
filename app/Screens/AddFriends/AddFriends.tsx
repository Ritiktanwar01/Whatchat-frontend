import { ScrollView } from 'react-native'
import { fetchFilteredContacts, FormattedContact,BackendContact } from '../../../hooks/AddFriends';
import ChatComponent from '../../../Components/Chat/Chat'
import React, { useEffect, useState } from 'react'

const AddFriends = () => {
    const [contactsList, setContactsList] = useState<BackendContact[]>([]);
    

    useEffect(() => {
        const syncContacts = async () => {
            const matchedContacts = await fetchFilteredContacts();
    
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