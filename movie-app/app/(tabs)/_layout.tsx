import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';


export default function TabLayout() {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <Label>Home</Label>
          <Icon sf={{ default: "house", selected: "house.fill" }} drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="play">
          <Icon sf="play" drawable="custom_settings_drawable" />
          <Label>Play</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <Icon sf="gear" drawable="custom_settings_drawable" />
          <Label>Settings</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }