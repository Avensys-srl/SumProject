import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CustomHeaderBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require('./assets/arrow-u-down-left-icon-original.png')}
        style={{width: 32, height: 32, tintColor: 'white', marginStart: 16}}
      />
    </TouchableOpacity>
  );
};

export default CustomHeaderBackButton;
