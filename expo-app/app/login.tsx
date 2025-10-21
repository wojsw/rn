import { StyleSheet, View, Button } from 'react-native'
import {ThemedText} from '@/components/themed-text';
import React, { useContext } from 'react'
import { AuthContext } from '@/utils/authContext';


const Login = () => {
    const { login } = useContext(AuthContext);
  return (
    <View>
      <ThemedText style={{textAlign: 'center'}}>Login Page</ThemedText>
      <Button title="Login" onPress={() => login()} />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

})