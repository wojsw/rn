import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '@/utils/authContext';
import { Redirect } from 'expo-router';

const Settings = () => {
    const { isLoggedIn, login, logout } = useContext(AuthContext);
    if (!isLoggedIn) {
        return <Redirect href="/login" />
    }
  return (
    <View>
      <Text>settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})