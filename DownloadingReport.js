import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  PermissionsAndroid,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useRoute} from '@react-navigation/native';
import ActivationButton from './ActivationButton';
import CustomBottomNavigation from './CustomBottomNavigation';
import HI from './assets/house-icon-original.png';
import PI from './assets/sliders-icon-original.png';
import II from './assets/info-icon-original.png';
import SI from './assets/wrench-icon-original.png';

const DownloadingReport = () => {
  const [excelData, setExcelData] = useState(null);

  const route = useRoute();

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Storage Permission',
          message:
            'This app needs access to your device storage to save files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Retrieve the 'excelData' from local storage
  const getExcelData = async () => {
    try {
      const newExcelData = await route.params?.newExcelData;
      //   const storedData = await AsyncStorage.getItem('updatedExcelData');
      const storedData = newExcelData;
      console.log('stored data ' + JSON.stringify(storedData));
      setExcelData(storedData);
      if (storedData) {
        return JSON.parse(storedData);
      } else {
        return null;
      }
    } catch (error) {
      //   console.error('Error retrieving data from local storage:', error);
      console.log('in catch');
      return null;
    }
  };

  const fetchData = async () => {
    const data = await getExcelData();
    if (data) {
      console.log('Data retrieved from local storage: ', data);
    } else {
      // Alert.alert('No data', 'Unable to retrieve data from local storage.');
    }
  };

  useEffect(() => {
    requestStoragePermission();
    fetchData();
  }, []);

  const downloadModifiedFile = async modifiedData => {
    if (!modifiedData || modifiedData.length === 0) {
      Alert.alert('No data', 'Please pass the data to download Excel file.');
      return;
    }

    try {
      const fileName = 'modified_data.xlsx';
      const outputPath = `/storage/emulated/0/Download/${fileName}`;

      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(modifiedData);

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      await RNFS.writeFile(
        outputPath,
        XLSX.write(workbook, {bookType: 'xlsx', type: 'base64'}),
        'base64',
      );

      console.log('Modified Excel file saved at:', outputPath);
      Alert.alert('Success', 'Excel file downloaded successfully.');
    } catch (error) {
      console.error('Error modifying and downloading Excel data:', error);
      Alert.alert('Error', 'Failed to download Excel file.');
    }
  };

  const generatePDF = async () => {
    if (!excelData || excelData.length === 0) {
      Alert.alert('No data', 'Please pass the data to download PDF file.');
      return;
    }

    // Define CSS styles for cell borders
    const cellStyle = `
      border: 1px solid #000;
      padding: 8px;
    `;

    // Create an HTML table from the Excel data with cell borders
    const tableRows = excelData.map(row => {
      const rowCells = Object.keys(row).map(key => {
        return `<td style="${cellStyle}">${row[key] || ''}</td>`;
      });
      return `<tr>${rowCells.join('')}</tr>`;
    });

    const columnHeaders = Object.keys(excelData[0]);
    const columnHeadersHTML = columnHeaders.map(header => {
      return `<th style="${cellStyle}">${header}</th>`;
    });

    const htmlContent = `
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              text-align: left;
              ${cellStyle}
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <table>
            <tr>${columnHeadersHTML.join('')}</tr>
            ${tableRows.join('')}
          </table>
        </body>
      </html>
    `;

    const outputPath = `${RNFS.ExternalDirectoryPath}/data_table.pdf`;

    const options = {
      html: htmlContent,
      fileName: 'data_table',
      directory: 'Documents',
      path: outputPath,
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF file generated:', file.filePath);
      const targetPath = '/storage/emulated/0/Download/data_table.pdf';
      await RNFS.moveFile(file.filePath, targetPath);
      console.log('PDF file moved to:', targetPath);
      Alert.alert('Success', 'PDF file downloaded successfully.');
    } catch (error) {
      console.error('Error generating or moving PDF:', error);
      Alert.alert('Error', 'Failed to download PDF file.');
    }
  };

  const handleDownloadExcel = () => {
    if (!excelData || excelData.length === 0) {
      Alert.alert('No data', 'Please pass the data to download Excel file.');
      return;
    }

    console.log('excel data in download ', excelData);

    downloadModifiedFile(excelData);
  };

  const handleDownloadPDF = () => {
    generatePDF();
  };

  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%', }}>
      <View style={{height: '80%', justifyContent: 'space-evenly'}}>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '100%',
          }}>
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 18,
            }}
            onPress={handleDownloadExcel}>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
              XLS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 18,
            }}
            onPress={handleDownloadPDF}>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '700'}}>
              PDF
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: '10%'}}>
          <ActivationButton TAB={'Download in progress'} rot={1} />
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: '20%',
        }}>
        <CustomBottomNavigation HI={HI} PI={PI} II={II} SI={SI} OC={0} />
      </View>
    </View>
  );
};

export default DownloadingReport;
