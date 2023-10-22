import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const {width, height} = Dimensions.get('window');

const CustomBottomNavigation = ({HI, PI, II, SI, OC}) => {
  let OCColor;
  if (OC === 0) {
    OCColor = 'black';
  } else if (OC === 1) {
    OCColor = 'red';
  }

  const navigation = useNavigation();

  const navigateToSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  const navigateToHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={[styles.container, {borderColor: OCColor}]}>
      <TouchableOpacity onPress={navigateToHome}>
        <Image source={HI} style={{height: 50, width: 50}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSettings}>
        <Image source={PI} style={{height: 50, width: 50}} />
      </TouchableOpacity>
      <Image source={II} style={{height: 50, width: 50}} />
      <Image source={SI} style={{height: 50, width: 50}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
});

export default CustomBottomNavigation;
