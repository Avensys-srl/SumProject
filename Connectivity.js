import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import ActivationButton from './ActivationButton';
import CustomBottomNavigation from './CustomBottomNavigation';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Connectivity = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={{height: '98%'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 24, color: 'black'}}>Room 2</Text>
        </View>

        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '50%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '25%',
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 14,
            }}>
            <Text>WIFI</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('VerificationParameters', {})}
            style={{
              backgroundColor: 'lightgreen',
              width: '25%',
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 14,
            }}>
            <View>
              <Text>BT</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'white',
              width: '25%',
              height: 80,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 14,
            }}>
            <Text>Cable</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '10%',
          }}>
          <ActivationButton TAB={'Connect'} rot={5} />
          <ActivationButton TAB={'Synchronize'} rot={5} />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: height * 0.2,
        }}>
        <CustomBottomNavigation />
      </View>
    </SafeAreaView>
  );
};

export default Connectivity;

const styles = StyleSheet.create({});
