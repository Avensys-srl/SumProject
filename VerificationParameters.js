import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomBottomNavigation from './CustomBottomNavigation';

const VerificationParameters = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={{height: '98%'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 24, color: 'black'}}>Room 2</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.verification}
            onPress={() => navigation.navigate('StartUpVerification', {})}>
            <Text style={styles.text}>start up parameter verification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.verification}>
            <Text style={styles.text}>supply and return verification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.service}
            onPress={() => navigation.navigate('DownloadService', {})}>
            <Text style={styles.text}>service</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <CustomBottomNavigation />
      </View>
    </View>
  );
};

export default VerificationParameters;

const styles = StyleSheet.create({
  container: {
    height: '94.6%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verification: {
    width: '93%',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'orange',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 18,
    marginBottom: '6%',
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  service: {
    width: '93%',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 18,
    marginBottom: '6%',
  },
});
