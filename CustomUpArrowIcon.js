import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {ImageSource} from './common/imageSource';

const CustomUpArrowIcon = () => {
  return (
    <View>
      <Image
        source={ImageSource.ArrowIcon}
        style={{height: 34, width: 34, marginRight: 16}}
      />
    </View>
  );
};

export default CustomUpArrowIcon;

const styles = StyleSheet.create({});
