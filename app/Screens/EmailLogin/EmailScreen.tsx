import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Signup } from '../../../hooks/Auth';

type RootStackParamList = {
  Otp: { email: string };
};

const EmailScreen: React.FC = () => {
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [emailInput, setEmailInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleContinue = async () => {
    const email = emailInput.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValidEmail) {
      setErrorMessage('');
      const res = await Signup({email})
      if (res.status == 200){
        
        navigation.navigate('Otp',{email:email})

      }
    } else {
      setErrorMessage('Please enter a valid email address');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-green-600 text-4xl font-bold text-center mb-10">
        ZappChat
      </Text>

      <Text className="text-gray-700 text-base mb-2">Enter your email</Text>
      <TextInput
        className="w-full h-12 border-b border-gray-300 text-lg text-gray-900 mb-2 placeholder:text-gray-900"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={emailInput}
        onChangeText={setEmailInput}
      />

      {errorMessage ? (
        <Text className="text-red-500 text-sm mb-4">{errorMessage}</Text>
      ) : null}

      <TouchableOpacity
        className="bg-green-500 py-3 rounded-md"
        onPress={handleContinue}
      >
        <Text className="text-white text-center text-base font-medium">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailScreen;