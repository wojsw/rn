import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '@/utils/authContext';

import { useColorScheme } from '@/hooks/use-color-scheme';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            // screenLayout={({children}) => (
            //   <>
            //     <ThemedText align="center" style={{ height: 180, lineHeight: 180, backgroundColor: '#fff' }}>这里是Stack组件 layout 属性</ThemedText>
            //     <ThemedView style={{ flex: 1, backgroundColor: '#fff' }}>{children}</ThemedView>
            //   </>
            // )}
          >
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
            <Stack.Screen name='detail/[id]' options={
              ({route}) => {
                return {
                  title: route?.params?.title,
                  headerBackTitle: '返回',
                }
              }
            } />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
      
  );
}
