import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import SettingsScreen from './SettingsScreen';
import CustomBottomNavigation from './CustomBottomNavigation';
import HI from './assets/house-icon-original.png';
import PI from './assets/sliders-icon-original.png';
import II from './assets/info-icon-original.png';
import SI from './assets/wrench-icon-original.png';

const {width} = Dimensions.get('window');

const ListofProjects = () => {
  const [excelData, setExcelData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState(null);
  const [triggerRerender, setTriggerRerender] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    retrieveExcelData();
  }, [triggerRerender]);

  const updateTriggerRerender = () => {
    setTriggerRerender(prev => !prev);
  };

  const storeSelectedValues = async () => {
    if (
      selectedLocation &&
      selectedProject &&
      selectedApartment &&
      selectedRoom
    ) {
    }
  };

  const retrieveExcelData = async () => {
    try {
      const excelDataString = await AsyncStorage.getItem('excelData');
      if (excelDataString) {
        const parsedExcelData = JSON.parse(excelDataString);
        setExcelData(parsedExcelData);
      } else {
        console.log('Excel data not found in local storage.');
      }
    } catch (error) {
      console.log('Error retrieving Excel data from local storage:', error);
    }
  };

  const openModal = dropdownType => {
    if (dropdownType === 'Project' && selectedLocation) {
      setCurrentDropdown('Project');
    } else if (dropdownType === 'Apartment' && selectedProject) {
      setCurrentDropdown('Apartment');
    } else if (dropdownType === 'Room' && selectedApartment) {
      setCurrentDropdown('Room');
    } else {
      setCurrentDropdown(dropdownType);
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onItemSelected(item)}>
        <Text style={styles.item}>{item[currentDropdown]}</Text>
      </TouchableOpacity>
    );
  };

  const onItemSelected = item => {
    switch (currentDropdown) {
      case 'Project':
        setSelectedProject(item.Project);
        break;
      case 'Location':
        setSelectedLocation(item.Location);
        setSelectedProject(null);
        setSelectedApartment(null);
        setSelectedRoom(null);
        break;
      case 'Room':
        setSelectedRoom(item.Room);
        if (currentDropdown === 'Room') {
          storeSelectedValues();
          navigation.navigate('DisplayData', {
            data: item,
            location: item.Location,
            project: item.Project,
          });
        } else {
          closeModal();
        }
        break;
      case 'Apartment':
        setSelectedApartment(item.Apartment);
        setSelectedRoom(null);
        break;
      default:
        break;
    }
    closeModal();
  };

  const locarray = excelData.map(item => item.Location);
  var position = 'Location';

  const filteredData = excelData.filter(item => {
    if (selectedLocation) {
      if (selectedProject) {
        if (selectedApartment) {
          if (selectedRoom) {
            position = 'Room';
            return (
              item.Location === selectedLocation &&
              item.Project === selectedProject &&
              item.Apartment === selectedApartment &&
              item.Room === selectedRoom
            );
          } else {
            position = 'Apartment';
            return (
              item.Location === selectedLocation &&
              item.Project === selectedProject &&
              item.Apartment === selectedApartment
            );
          }
        } else {
          position = 'Project';
          return (
            item.Location === selectedLocation &&
            item.Project === selectedProject
          );
        }
      } else {
        position = 'Location';
        return item.Location === selectedLocation;
      }
    } else {
      return locarray.indexOf(item.Location) !== -1;
    }
  });

  const filteredData2 = filteredData;

  const dropdownTextLocation = selectedLocation
    ? `${selectedLocation}`
    : 'Select Location ▼';
  const dropdownTextProject = selectedProject
    ? `${selectedProject}`
    : 'Select Project ▼';
  const dropdownTextApartment = selectedApartment
    ? `${selectedApartment}`
    : 'Select Apartment ▼';
  const dropdownTextRoom = selectedRoom ? `${selectedRoom}` : 'Select Room ▼';

  return (
    <View style={styles.mainView}>
      <View>
        {excelData.length > 0 ? (
          <View>
            <Text>Select Location:</Text>
            <TouchableOpacity onPress={() => openModal('Location')}>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>{dropdownTextLocation}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.messageText}>Upload an Excel File</Text>
        )}

        {selectedLocation && (
          <View>
            <Text style={styles.txtTitledd}>Select Project:</Text>
            <TouchableOpacity onPress={() => openModal('Project')}>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>{dropdownTextProject}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {selectedProject && (
          <View>
            <Text style={styles.txtTitledd}>Select Apartment:</Text>
            <TouchableOpacity onPress={() => openModal('Apartment')}>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>{dropdownTextApartment}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {selectedApartment && (
          <View>
            <Text style={styles.txtTitledd}>Select Room:</Text>
            <TouchableOpacity onPress={() => openModal('Room')}>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>{dropdownTextRoom}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <FlatList
            data={filteredData2}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Close" onPress={closeModal} />
        </Modal>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <CustomBottomNavigation HI={HI} PI={PI} II={II} SI={SI} OC={0} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 15,
  },
  fileNameDisplay: {
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 15,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  dropdownContainer: {
    width: width * 0.8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownText: {
    fontSize: 16,
    padding: 10,
  },
  mainView: {
    margin: 20,
    height: '98%',
  },
  txtTitledd: {
    marginTop: 10,
  },
  messageText: {
    padding: 10,
    fontSize: 25,
    color: 'red',
  },
});

export default ListofProjects;
