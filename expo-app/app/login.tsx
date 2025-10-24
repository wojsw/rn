import { View, Button } from 'react-native'
import {ThemedText} from '@/components/themed-text';
import React, { useContext } from 'react'
import { AuthContext } from '@/utils/authContext';
import { Redirect, router } from 'expo-router';

const Login = () => {
    const { login, isLoggedIn } = useContext(AuthContext);
    if (isLoggedIn) {
      return <Redirect href="/" />
    }
  return (
    <View>
      <ThemedText style={{textAlign: 'center'}}>Login Page</ThemedText>
      <Button title='跳过登录（部分功能需要登录）' onPress={() => router.replace('/')} />
      <Button title="Login" onPress={() => login()} />
    </View>
  )
}

export default Login
