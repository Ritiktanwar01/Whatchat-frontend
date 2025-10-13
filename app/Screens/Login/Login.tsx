import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput as RNTextInput,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { countries, Country } from '../../utils/countries';

const SCREEN_WIDTH = Dimensions.get('window').width;

const LoginScreen: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneDigits, setPhoneDigits] = useState<string[]>(Array(10).fill(''));
  const inputRefs = useRef<Array<RNTextInput | null>>([]);
  const navigation = useNavigation();

  const handleDigitChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newDigits = [...phoneDigits];
    newDigits[index] = digit;
    setPhoneDigits(newDigits);

    if (digit && index < phoneDigits.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !phoneDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const phone = phoneDigits.join('');
    if (phone.length === 10) {
      navigation.navigate('Otp' as never);
    } else {
      console.warn('Please enter a valid 10-digit number');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-green-600 text-4xl font-bold text-center mb-10">ZappChat</Text>

   
      <TouchableOpacity
        className="flex-row items-center mb-4"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-2xl mr-2">{selectedCountry.flag}</Text>
        <Text className="text-lg text-gray-800">+{selectedCountry.callingCode}</Text>
      </TouchableOpacity>

     
      {modalVisible && (
  <View className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50 pt-10">
    <FlatList
      data={countries}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="flex-row items-center px-4 py-3 border-b border-gray-200"
          onPress={() => {
            setSelectedCountry(item);
            setModalVisible(false);
          }}
        >
          <Text className="text-2xl mr-3">{item.flag}</Text>
          <Text className="text-base text-gray-800">
            {item.name} (+{item.callingCode})
          </Text>
        </TouchableOpacity>
      )}
    />
    <TouchableOpacity
      className="absolute top-4 right-4 p-2"
      onPress={() => setModalVisible(false)}
    >
      <Text className="text-lg text-red-500">Close</Text>
    </TouchableOpacity>
  </View>
)}


      
      <Text className="text-gray-700 text-base mb-2">Enter your phone number</Text>
      <View className="flex-row justify-between mb-6">
        {phoneDigits.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => { inputRefs.current[index] = ref; }}
            className="w-[32px] h-[48px] border-b border-t border-l border-r rounded border-gray-300 text-center text-lg text-gray-900"
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleDigitChange(text, index)}
            onKeyPress={(e) => handleBackspace(e, index)}
          />
        ))}
      </View>

      <TouchableOpacity
        className="bg-green-500 py-3 rounded-md"
        onPress={handleContinue}
      >
        <Text className="text-white text-center text-base font-medium">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
