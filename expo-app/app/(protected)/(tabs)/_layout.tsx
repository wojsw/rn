import { Tabs } from 'expo-router';
import React, { useContext } from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button , StyleSheet } from 'react-native';
import { AuthContext } from '@/utils/authContext';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
      }}
      screenLayout={({children}) => (
        <>
          <ThemedText align="center" style={styles.headerText}>这里是Tabs组件 screenLayout 属性;可以统一处理样式；也可以添加ErrorBoundary等组件，增加全局统一处理。</ThemedText>
          <ThemedView style={{ flex: 1, backgroundColor: '#fff' }}>{children}</ThemedView>
        </>
      )}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
        
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          headerRight: () => (
            <Button title="右边" onPress={() => {}} color="#fff" />
          ),
          headerLeft: () => (
            <Button title="左边" onPress={() => {}} color="#fff" />
          ),

        }}
      />

        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
          }}
        />

    </Tabs>
  );
}
const styles = StyleSheet.create({
  headerText: {
    height: 180,
    backgroundColor: '#fff',
    wordWrap: 'wrap',
    paddingTop: 60,
    paddingRight: 30,
    paddingLeft: 30,
  },
});