import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerStyle: {backgroundColor: '#25292e'}}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
    </Stack>
  );
}
