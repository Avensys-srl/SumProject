import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {ImageSource} from './common/imageSource';

const ActivationButton = ({TAB, rot}) => {
  const [rotationSpeed, setRotationSpeed] = useState(rot);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotationAngle(prevAngle => (prevAngle + rotationSpeed) % 360);
    }, 16);

    return () => {
      clearInterval(intervalId);
    };
  }, [rotationSpeed]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{TAB}</Text>
      <Image
        source={ImageSource.Calibration}
        style={{
          transform: [{rotate: rotationAngle + 'deg'}],
          width: 100,
          height: 100,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: 'black',
    fontSize: 18,
  },
});

export default ActivationButton;
