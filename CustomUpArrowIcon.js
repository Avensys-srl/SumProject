import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomUpArrowIcon = () => {
  return (
    <View>
      <Image source={require('./assets/arrow-circle-up-icon-White.png')} style={{height: 34, width: 34, marginRight: 16}} />
    </View>
  )
}

export default CustomUpArrowIcon

const styles = StyleSheet.create({})