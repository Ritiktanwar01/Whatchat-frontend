export type Country = {
  name: string;
  code: string;
  callingCode: string;
  flag: string;
  digitCount: number;
};

export const countries: Country[] = [
  { name: 'India', code: 'IN', callingCode: '91', flag: '🇮🇳', digitCount: 10 },
  { name: 'United States', code: 'US', callingCode: '1', flag: '🇺🇸', digitCount: 10 },
  { name: 'United Kingdom', code: 'GB', callingCode: '44', flag: '🇬🇧', digitCount: 10 },
  { name: 'Germany', code: 'DE', callingCode: '49', flag: '🇩🇪', digitCount: 11 },
  { name: 'France', code: 'FR', callingCode: '33', flag: '🇫🇷', digitCount: 9 },
  // Add more as needed
];
