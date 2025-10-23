import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TextInput as RNTextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Signup, VerifyOTP } from '../../../hooks/Auth';

const OTP_LENGTH = 6;

const OtpScreen: React.FC = () => {
  const route = useRoute();
  const { email } = route.params as { email: string };
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<Array<RNTextInput | null>>([]);
  const navigation = useNavigation();

  const ResendOTP = async () => {
    try {
      const resend = await Signup({email});
      if (resend) {
        Alert.alert('OTP resent successfully');
      } else {
        Alert.alert('Failed to resend OTP');
      }

    } catch (error) {
      
    }
  }

  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, []);

  const handleDigitChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    if (digit && index < OTP_LENGTH - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 10);
    }
  };

  const handleBackspace = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpDigits[index] && index > 0) {
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus();
      }, 10);
    }
  };

  const handleVerify = async () => {
    const otp = otpDigits.join('');
    if (otp.length === OTP_LENGTH) {
      const verify = await VerifyOTP({ email, otp });

      if (verify.login) {
        navigation.navigate(verify.screen as never);
      } else {
        Alert.alert('Invalid OTP');
      }
    } else {
      Alert.alert('Please enter a valid 6-digit OTP');
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-[#A3D993] text-3xl font-bold text-center mb-6">Verify OTP</Text>
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
        className="bg-[#A3D993] py-3 rounded-md"
        onPress={handleVerify}
      >
        <Text className="text-white text-center text-base font-medium">Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4" onPress={ResendOTP}>
        <Text className="text-center text-sm text-gray-600">Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;
