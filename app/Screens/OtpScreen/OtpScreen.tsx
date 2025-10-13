import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInput as RNTextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VerifyOTP } from '../../../hooks/Auth';

const OTP_LENGTH = 6;

const OtpScreen: React.FC = () => {
  const route = useRoute();
  const { email } = route.params as { email: string };
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<Array<RNTextInput | null>>([]);
  const navigation = useNavigation();

  useEffect(() => {
    inputRefs.current = Array(OTP_LENGTH).fill(null);
  }, []);

  const handleDigitChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = otpDigits.join('');
    if (otp.length === OTP_LENGTH) {

      const verify = await VerifyOTP({email,otp})
      
      if (verify){
          navigation.navigate('Home' as never);
      }else{
        Alert.alert("invalid OTP")
      }
      
    } else {
      console.warn('Please enter a valid 6-digit OTP');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-green-600 text-3xl font-bold text-center mb-6">Verify OTP</Text>
      <Text className="text-gray-700 text-base text-center mb-4">
        Enter the 6-digit code sent to your email
      </Text>

      <View className="flex-row justify-between mb-6">
        {otpDigits.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => { inputRefs.current[index] = ref; }}
            className="w-[40px] h-[50px] border-b border-gray-300 text-center text-lg text-gray-900"
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
        onPress={handleVerify}
      >
        <Text className="text-white text-center text-base font-medium">Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4">
        <Text className="text-center text-sm text-gray-600">Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;
