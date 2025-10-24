import { StyleSheet, View, Button } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '@/utils/authContext';
import { Redirect } from 'expo-router';
import { ThemedText } from '@/components/themed-text';

const Settings = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    if (!isLoggedIn) {
        return <Redirect href="/login" />
    }
  return (
    <View>
      <ThemedText align="center">settings</ThemedText>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})