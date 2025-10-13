
import { Text, View } from "react-native";
import { Stack, Tabs } from "expo-router";
import "./global.css"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="details" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
