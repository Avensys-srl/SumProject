import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import CustomBottomNavigation from './CustomBottomNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialDisplayData = {
  warrantyperiod: true,
  apartmentSqm: true,
  Unit: true,
  coefficient: true,
  Airflowstep1: true,
  Airflowstep2: true,
  Airflowstep3: true,
  standby: true,
  Deltahumidity: true,
  Maxairflow: true,
  Boosttimer: true,
  Firecontact: true,
  firefrequency: true,
  kitchenhood: true,
  Configuration: true,
  Positioning: true,
  bypassregulatedon: true,
  bypassminexternaltemperature: true,
  defrosttemp: true,
  filtertimer: true,
};

const {width} = Dimensions.get('window');

const DisplayData = () => {
  const route = useRoute();
  const {data} = route.params;
  const [displayDataObj, setDisplayDataObj] = useState(initialDisplayData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Save the data to local storage
    saveDataToLocalstorage(data);

    // Retrieve saved data from local storage
    retrieveExcelData();
  }, []);

  const saveDataToLocalstorage = async data => {
    try {
      const dataToSave = JSON.stringify(data);
      await AsyncStorage.setItem('data', dataToSave);
      await AsyncStorage.setItem('toggleState', 'true');
      console.log('Data saved to local storage:', dataToSave);
    } catch (error) {
      console.log('Error saving data to local storage:', error);
    }
  };

  const retrieveExcelData = async () => {
    try {
      const excelDataStringupdated = await AsyncStorage.getItem('data');
      const updatedToggleState = await AsyncStorage.getItem('toggleState');

      if (updatedToggleState) {
        setDisplayDataObj(JSON.parse(excelDataStringupdated));
      } else {
        console.log('Toggle state not found in local storage.');
      }

      console.log('Excel data:', excelDataStringupdated);
    } catch (error) {
      console.log('Error retrieving data from local storage:', error);
    }
  };

  const filteredKeys = Object.keys(displayDataObj).filter(key => {
    return (
      key.toLowerCase().includes(searchQuery.toLowerCase()) &&
      displayDataObj[key]
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.roomTitle}>Room: {data.Room}</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <View style={{paddingHorizontal: 20, height: '75%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredKeys.map(key => (
            <Text key={key} style={styles.textColor}>
              {key}: {data[key]}
            </Text>
          ))}
        </ScrollView>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <CustomBottomNavigation />
      </View>
    </View>
  );
};

export default DisplayData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textColor: {
    backgroundColor: '#ffff00',
    width: width * 0.9,
    padding: 5,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffc000',
    marginTop: 10,
    borderRadius: 6,
  },
  lasttxt: {
    backgroundColor: '#ffff00',
    width: width * 0.9,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffc000',
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 6,
    fontSize: 16,
  },
  roomTitle: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  searchBar: {
    width: '80%',
    alignSelf: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: '#ffc000',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
});
