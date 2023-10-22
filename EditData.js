import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import CustomBottomNavigation from './CustomBottomNavigation';
import HI from './assets/house-icon-original.png';
import PI from './assets/sliders-icon-original.png';
import II from './assets/info-icon-original.png';
import SI from './assets/wrench-icon-original.png';

const EditData = ({route}) => {
  const {selectedData} = route.params;
  const [inputValues, setInputValues] = useState({});
  const [uncheckedCheckboxCount, setUncheckedCheckboxCount] = useState(0);
  const [data, setData] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    retrieveDataFromStorage();
  }, []);

  const retrieveDataFromStorage = async () => {
    try {
      const savedData = await AsyncStorage.getItem('data');

      if (savedData !== null) {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);

        const initialInputValues = {};
        for (const key in parsedData) {
          initialInputValues[key] = '';
        }
        setInputValues(initialInputValues);
      } else {
        console.log('Data not found in local storage');
      }
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
    }
  };

  const handleInputChange = (key, value) => {
    setInputValues({...inputValues, [key]: value});
  };

  useEffect(() => {
    countUncheckedCheckboxes();
  }, [inputValues]);

  const countUncheckedCheckboxes = () => {
    const count = Object.values(inputValues).filter(value => !value).length;
    setUncheckedCheckboxCount(count);
  };

  const updateExcelData = async updatedData => {
    try {
      const excelData = await AsyncStorage.getItem('excelData');
      if (excelData !== null) {
        const parsedExcelData = JSON.parse(excelData);

        const updatedExcelData1 = parsedExcelData.map(item => {
          if (
            item.Location === updatedData.Location &&
            item.Apartment === updatedData.Apartment &&
            item.Project === updatedData.Project &&
            item.Room === updatedData.Room
          ) {
            return updatedData;
          }
          return item;
        });

        await AsyncStorage.setItem(
          'excelData',
          JSON.stringify(updatedExcelData1),
        );
        console.log('excelData updated in local storage', updatedExcelData1);
        return updatedExcelData1;
      }
    } catch (error) {
      console.error('Error updating excelData:', error);
      return null;
    }
  };

  const handleDownload = async () => {
    const updatedData = {...data};

    Object.keys(updatedData).forEach(key => {
      if (inputValues[key] !== undefined) {
        if (inputValues[key] !== '') {
          updatedData[key] = inputValues[key];
        }
      }
    });

    console.log('Updated Data:', updatedData);

    const updatedExcelData = await updateExcelData(updatedData);
    saveDataToStorage(updatedExcelData);
    navigation.navigate('DownloadingReport', {newExcelData: updatedExcelData});
  };

  const saveDataToStorage = async data => {
    try {
      await AsyncStorage.setItem('updatedExcelData', JSON.stringify(data));
      console.log('Data saved to local storage', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  };

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

      <ScrollView
        style={{height: '70%', marginTop: 20, paddingHorizontal: 8}}
        showsVerticalScrollIndicator={false}>
        {Object.keys(selectedData).map(key => (
          <View style={styles.rowContainer} key={key}>
            <View style={styles.keyContainer}>
              <Text style={styles.keyText}>{key}</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{selectedData[key]}</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Value"
                value={inputValues[key]}
                onChangeText={text => handleInputChange(key, text)}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => {
                  const updatedInputValues = {...inputValues};
                  updatedInputValues[key] = !updatedInputValues[key];
                  setInputValues(updatedInputValues);
                }}
                isChecked={inputValues[key]}
                leftText={''}
              />
            </View>
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 10,
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>
            {uncheckedCheckboxCount} Data remaining
          </Text>
          <TouchableOpacity onPress={handleDownload}>
            <Image
              style={styles.downloadImg}
              source={require('./assets/download_file.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: '20%',
        }}>
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
  },
  keyContainer: {
    width: '20%',
  },
  valueContainer: {
    width: '20%',
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderColor: 'orange',
    marginVertical: 4,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '20%',
    backgroundColor: 'orange',
    borderWidth: 2,
    borderColor: 'orange',
    marginVertical: 4,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  valueText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    height: 40,
  },
  downloadImg: {
    height: 25,
    width: 25,
    marginLeft: 4,
  },
});

export default EditData;
