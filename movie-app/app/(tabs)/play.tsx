import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

const play = () => {
  return (
    <View 
      style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
        <Text>play</Text>
        <Link href="/list">
          <Text>details</Text>
        </Link>
    </View>
  )
}

export default play