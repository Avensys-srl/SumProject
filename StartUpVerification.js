import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'react-native-check-box';
import HI from './assets/house-icon-original.png';
import PI from './assets/sliders-icon-original.png';
import II from './assets/info-icon-original.png';
import SI from './assets/wrench-icon-original.png';
import {useNavigation} from '@react-navigation/native';
import CustomBottomNavigation from './CustomBottomNavigation';

const StartUpVerification = () => {
  const [data, setData] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    retrieveDataFromStorage();
  }, []);

  const retrieveDataFromStorage = async () => {
    try {
      const savedData = await AsyncStorage.getItem('data');

      if (savedData !== null) {
        setData(JSON.parse(savedData)); // Parse the saved data to an object
        // Initialize checkbox states
        const initialCheckboxStates = {};
        Object.keys(data).forEach(key => {
          initialCheckboxStates[key] = false;
        });
        setCheckboxStates(initialCheckboxStates);
      } else {
        // Handle the case where the data is null (not found in storage)
        console.log('Data not found in local storage');
      }
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
    }
  };

  const filteredKeys = data
    ? Object.keys(data).filter(
        key => !['Location', 'Project', 'Apartment', 'Room'].includes(key),
      )
    : [];

  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '1%',
        }}>
        <View style={styles.headerContainer}>
          <Text style={{color: 'black'}}>Unit</Text>
        </View>
        <View>
          <Text style={{fontSize: 24, color: 'black'}}>Room 2</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={{color: 'black'}}>Serial Number</Text>
        </View>
      </View>
      {/* Render keys and values from the filtered data object */}
      {data && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: '2%',
              marginBottom: '2%',
              marginStart: '12%',
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                Design
              </Text>
            </View>
            <View>
              <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                Field
              </Text>
            </View>
          </View>
          <ScrollView style={{height: '75%'}}>
            <View style={styles.container}>
              {filteredKeys.map(key => (
                <View style={styles.rowContainer} key={key}>
                  <CheckBox
                    style={{flex: 1, padding: 10, marginHorizontal: '5%'}}
                    onClick={() => {
                      setCheckboxStates({
                        ...checkboxStates,
                        [key]: !checkboxStates[key], // Update the state for this key
                      });
                    }}
                    isChecked={checkboxStates[key]}
                    leftText={''}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View style={styles.keyContainer}>
                      <Text style={styles.keyText}>{key}</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueText}>{data[key]}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* <View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View style={styles.bottomView}>
            <Text>kitchenhood forcing confirmation [m3/h]</Text>
          </View>
          <View style={styles.bottomView}>
            <Text>frost protection set</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View style={styles.bottomView}>
            <Text>kitchenhood forcing confirmation [m3/h]</Text>
          </View>
          <View style={styles.bottomView}>
            <Text>frost protection set</Text>
          </View>
          <View style={styles.bottomView}>
            <Text>frost protection set</Text>
          </View>
        </View>
      </View> */}

      <View style={{alignItems: 'center', marginTop: '1%'}}>
        <TouchableOpacity
          style={{
            paddingVertical: 4,
            paddingHorizontal: 50,
            backgroundColor: 'orange',
            borderRadius: 12,
            borderWidth: 2,
            borderColor: 'black',
          }}
          onPress={() => {
            const selectedData = {};
            for (const key in checkboxStates) {
              if (checkboxStates[key]) {
                selectedData[key] = data[key];
              }
            }
            navigation.navigate('EditData', {selectedData});
          }}>
          <Text style={{fontSize: 16, color: 'black'}}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <CustomBottomNavigation HI={HI} PI={PI} II={II} SI={SI} OC={0} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '30%',
    borderWidth: 2,
    borderColor: 'orange',
    paddingVertical: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
  },
  keyContainer: {
    width: '30%',
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderColor: 'orange',
    marginVertical: 4,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    width: '30%',
    backgroundColor: 'orange',
    borderWidth: 2,
    borderColor: 'orange',
    marginVertical: 4,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  valueText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  bottomView: {
    width: '35%',
    borderWidth: 2,
    borderColor: 'blue',
    backgroundColor: 'orange',
    borderRadius: 10,
    marginTop: '2%',
  },
});

export default StartUpVerification;
