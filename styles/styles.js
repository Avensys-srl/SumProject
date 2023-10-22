import {StyleSheet} from 'react-native';
import * as Colors from './colors';

const boxShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const CustomStyles = StyleSheet.create({
  BlueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    backgroundColor: Colors.LIGHT_BLUE,
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    borderRadius: 6,
    width: 'auto',
    ...boxShadow,
  },
  BtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.GREY,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
});

export default CustomStyles;
