import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { storageService } from '../storage/localStorage';

const ExportDataScreen = ({ navigation }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportJSON = async () => {
    setIsExporting(true);
    try {
      const jsonData = await storageService.exportAllData();
      if (!jsonData) {
        Alert.alert('Error', 'Failed to export data');
        return;
      }

      const fileName = `zenflow-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      if (Platform.OS === 'web') {
        // For web, download the file
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        Alert.alert('Success', 'Data exported successfully!');
      } else {
        // For mobile, share the data
        try {
          await Share.share({
            message: jsonData,
            title: 'ZenFlow Tracker Backup (JSON)',
          });
        } catch (shareError) {
          if (shareError.message !== 'User did not share') {
            Alert.alert('Info', 'You can copy the data from the share dialog');
          }
        }
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', 'Failed to export data: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const csvData = await storageService.exportAsCSV();
      if (!csvData) {
        Alert.alert('Error', 'Failed to export CSV data');
        return;
      }

      const fileName = `zenflow-backup-${new Date().toISOString().split('T')[0]}.csv`;
      
      if (Platform.OS === 'web') {
        // For web, download the file
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        Alert.alert('Success', 'CSV exported successfully!');
      } else {
        // For mobile, share the data
        try {
          await Share.share({
            message: csvData,
            title: 'ZenFlow Tracker Backup (CSV)',
          });
        } catch (shareError) {
          if (shareError.message !== 'User did not share') {
            Alert.alert('Info', 'You can copy the data from the share dialog');
          }
        }
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', 'Failed to export CSV: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShareData = async () => {
    setIsExporting(true);
    try {
      const jsonData = await storageService.exportAllData();
      if (!jsonData) {
        Alert.alert('Error', 'Failed to prepare data for sharing');
        return;
      }

      await Share.share({
        message: `ZenFlow Tracker Backup\n\n${jsonData}`,
        title: 'ZenFlow Tracker Backup',
      });
    } catch (error) {
      console.error('Share error:', error);
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'Failed to share data');
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFDF5" />
        </TouchableOpacity>
        <Text style={styles.title}>Export & Backup</Text>
        <Text style={styles.subtitle}>Backup your fitness data</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <MaterialIcons name="info" size={32} color="#628B35" />
          <Text style={styles.infoText}>
            Export your data to keep a backup or transfer it to another device.
            Your data includes profile, daily entries, exercises, workout history, and body measurements.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Options</Text>
          
          <TouchableOpacity
            style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
            onPress={handleExportJSON}
            disabled={isExporting}
          >
            <MaterialIcons name="code" size={24} color="#FFFDF5" />
            <View style={styles.exportButtonContent}>
              <Text style={styles.exportButtonTitle}>Export as JSON</Text>
              <Text style={styles.exportButtonSubtitle}>
                Complete backup in JSON format
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#FFFDF5" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
            onPress={handleExportCSV}
            disabled={isExporting}
          >
            <MaterialIcons name="table-chart" size={24} color="#FFFDF5" />
            <View style={styles.exportButtonContent}>
              <Text style={styles.exportButtonTitle}>Export as CSV</Text>
              <Text style={styles.exportButtonSubtitle}>
                Spreadsheet-friendly format
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#FFFDF5" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
            onPress={handleShareData}
            disabled={isExporting}
          >
            <MaterialIcons name="share" size={24} color="#FFFDF5" />
            <View style={styles.exportButtonContent}>
              <Text style={styles.exportButtonTitle}>Share Data</Text>
              <Text style={styles.exportButtonSubtitle}>
                Share via messaging or email
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#FFFDF5" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Included</Text>
          <View style={styles.dataList}>
            <View style={styles.dataItem}>
              <MaterialIcons name="person" size={20} color="#628B35" />
              <Text style={styles.dataItemText}>Profile Information</Text>
            </View>
            <View style={styles.dataItem}>
              <MaterialIcons name="calendar-today" size={20} color="#628B35" />
              <Text style={styles.dataItemText}>Daily Entries</Text>
            </View>
            <View style={styles.dataItem}>
              <MaterialIcons name="fitness-center" size={20} color="#628B35" />
              <Text style={styles.dataItemText}>Exercises</Text>
            </View>
            <View style={styles.dataItem}>
              <MaterialIcons name="history" size={20} color="#628B35" />
              <Text style={styles.dataItemText}>Workout History</Text>
            </View>
            <View style={styles.dataItem}>
              <MaterialIcons name="straighten" size={20} color="#628B35" />
              <Text style={styles.dataItemText}>Body Measurements</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
  },
  header: {
    backgroundColor: '#103713',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFDF5',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#E2DBD0',
  },
  content: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#E2DBD0',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#628B35',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: '#103713',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 16,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#628B35',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#103713',
  },
  exportButtonDisabled: {
    opacity: 0.6,
  },
  exportButtonContent: {
    flex: 1,
    marginLeft: 12,
  },
  exportButtonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFDF5',
    marginBottom: 4,
  },
  exportButtonSubtitle: {
    fontSize: 12,
    color: '#E2DBD0',
  },
  dataList: {
    backgroundColor: '#E2DBD0',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  dataItemText: {
    fontSize: 14,
    color: '#103713',
    fontWeight: '600',
  },
});

export default ExportDataScreen;
