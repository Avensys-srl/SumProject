import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBottomNavigation from './CustomBottomNavigation';
import {ImageSource} from './common/imageSource';

const SettingsScreen = () => {
  const [keys, setKeys] = useState([]);
  const [toggleState, setToggleState] = useState({});
  const [excelData, setExcelData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    retrieveExcelData();
    retrieveToggleState();
  }, []);

  const retrieveExcelData = async () => {
    try {
      const excelDataString = await AsyncStorage.getItem('excelData');

      if (excelDataString) {
        const parsedExcelData = JSON.parse(excelDataString);

        if (Array.isArray(parsedExcelData)) {
          if (parsedExcelData.length > 0) {
            const firstObject = parsedExcelData[0];
            const extractedKeys = Object.keys(firstObject);

            const defaultToggleState = {};
            extractedKeys.forEach(key => {
              defaultToggleState[key] = true;
            });

            setKeys(extractedKeys);
            setExcelData(parsedExcelData);
            setToggleState(defaultToggleState);
          }
        }
      }
    } catch (error) {
      console.log('Error retrieving Excel data from local storage:', error);
    }
  };

  const retrieveToggleState = async () => {
    try {
      const toggleStateString = await AsyncStorage.getItem('toggleState');

      if (toggleStateString) {
        const parsedToggleState = JSON.parse(toggleStateString);
        setToggleState(parsedToggleState);
      }
    } catch (error) {
      console.log('Error retrieving toggle state from local storage:', error);
    }
  };

  const handleButtonPress = async key => {
    try {
      const updatedToggleState = {
        ...toggleState,
        [key]: !toggleState[key],
      };

      await AsyncStorage.setItem(
        'toggleState',
        JSON.stringify(updatedToggleState),
      );
      setToggleState(updatedToggleState);

      if (!updatedToggleState[key]) {
        const updatedExcelData = excelData.filter(
          entry => entry[key] !== undefined,
        );

        await AsyncStorage.setItem(
          'excelData',
          JSON.stringify(updatedExcelData),
        );
        setExcelData(updatedExcelData);
        console.log('updatedExcelData' + updatedExcelData);
      }
    } catch (error) {
      console.log('Error handling button press:', error);
    }
  };

  const filteredKeys = keys.filter(key => {
    return (
      key.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !['Location', 'Project', 'Apartment', 'Room'].includes(key)
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      {excelData.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {filteredKeys.map(key => (
            <TouchableOpacity
              key={key}
              style={styles.touchable}
              onPress={() => handleButtonPress(key)}>
              <Text>{key}</Text>
              {!toggleState[key] ? (
                <Image source={ImageSource.RedEye} style={styles.image} />
              ) : null}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.messageText}>Upload an Excel File</Text>
      )}
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <CustomBottomNavigation />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  searchBarContainer: {
    alignItems: 'center',
  },
  searchBar: {
    width: '80%',
    padding: 10,
    borderWidth: 2,
    borderColor: '#ffc000',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    justifyContent: 'center',
  },
  touchable: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#ffc000',
    borderRadius: 5,
    backgroundColor: '#ffff00',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 8,
  },
  messageText: {
    padding: 10,
    fontSize: 25,
    color: 'red',
  },
  image: {
    height: 20,
    width: 20,
    marginLeft: 4,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

export default SettingsScreen;
