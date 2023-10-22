import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

const TrippleBtn = ({TBL, TBC, TBR, TbL, TbC, TbR}) => {
  const [firstContainer, setFirstContainer] = useState('white');
  const [secondContainer, setSecondContainer] = useState('white');
  const [thirdContainer, setThirdContainer] = useState('white');

  useEffect(() => {
    if (TBL === 1) {
      setFirstContainer('lightgreen');
      setSecondContainer('white');
      setThirdContainer('white');
    } else if (TBC === 1) {
      setFirstContainer('white');
      setSecondContainer('lightgreen');
      setThirdContainer('white');
    } else if (TBR === 1) {
      setFirstContainer('white');
      setSecondContainer('white');
      setThirdContainer('lightgreen');
    }
  }, [TBL, TBC, TBR]);

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Pressable
        onPress={() => (
          setFirstContainer('lightgreen'),
          setSecondContainer('white'),
          setThirdContainer('white')
        )}>
        <View
          style={[styles.btnContainer, {backgroundColor: `${firstContainer}`}]}>
          <Text>{TbL}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => (
          setFirstContainer('white'),
          setSecondContainer('lightgreen'),
          setThirdContainer('white')
        )}>
        <View
          style={[
            styles.btnContainer,
            {backgroundColor: `${secondContainer}`},
          ]}>
          <Text>{TbC}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => (
          setFirstContainer('white'),
          setSecondContainer('white'),
          setThirdContainer('lightgreen')
        )}>
        <View
          style={[styles.btnContainer, {backgroundColor: `${thirdContainer}`}]}>
          <Text>{TbR}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    padding: 30,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 12,
  },
});
export default TrippleBtn;
