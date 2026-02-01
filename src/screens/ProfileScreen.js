import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { storageService } from '../storage/localStorage';

const ProfileScreen = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [arms, setArms] = useState('');
  const [thighs, setThighs] = useState('');
  const [chest, setChest] = useState('');
  const [hips, setHips] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const profile = await storageService.getProfile();
    if (profile) {
      setAge(profile.age?.toString() || '');
      setHeight(profile.height?.toString() || '');
      setWeight(profile.weight?.toString() || '');
    }
    
    // Load today's body measurements
    const today = new Date().toISOString().split('T')[0];
    const measurements = await storageService.getBodyMeasurement(today);
    if (measurements) {
      setWaist(measurements.waist?.toString() || '');
      setArms(measurements.arms?.toString() || '');
      setThighs(measurements.thighs?.toString() || '');
      setChest(measurements.chest?.toString() || '');
      setHips(measurements.hips?.toString() || '');
    }
  };

  const handleSave = async () => {
    if (!age || !height || !weight) {
      Alert.alert('Error', 'Please fill in age, height, and weight');
      return;
    }

    const profile = {
      age: parseInt(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
    };

    await storageService.saveProfile(profile);
    
    // Save body measurements
    const today = new Date().toISOString().split('T')[0];
    const measurements = {
      waist: waist ? parseFloat(waist) : null,
      arms: arms ? parseFloat(arms) : null,
      thighs: thighs ? parseFloat(thighs) : null,
      chest: chest ? parseFloat(chest) : null,
      hips: hips ? parseFloat(hips) : null,
    };
    
    await storageService.saveBodyMeasurements(today, measurements);
    
    Alert.alert('Success', 'Profile and measurements saved successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Profile Settings</Text>
        <Text style={styles.subtitle}>Update your personal information</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Enter your age"
            placeholderTextColor="#628B35"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="decimal-pad"
            placeholder="Enter your height"
            placeholderTextColor="#628B35"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            placeholder="Enter your weight"
            placeholderTextColor="#628B35"
          />
        </View>

        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>Body Measurements (cm)</Text>
          <Text style={styles.sectionSubtitle}>Optional - Track your body measurements</Text>
        </View>

        <View style={styles.measurementsRow}>
          <View style={styles.measurementInput}>
            <Text style={styles.label}>Waist</Text>
            <TextInput
              style={styles.input}
              value={waist}
              onChangeText={setWaist}
              keyboardType="decimal-pad"
              placeholder="cm"
              placeholderTextColor="#628B35"
            />
          </View>
          <View style={styles.measurementInput}>
            <Text style={styles.label}>Arms</Text>
            <TextInput
              style={styles.input}
              value={arms}
              onChangeText={setArms}
              keyboardType="decimal-pad"
              placeholder="cm"
              placeholderTextColor="#628B35"
            />
          </View>
        </View>

        <View style={styles.measurementsRow}>
          <View style={styles.measurementInput}>
            <Text style={styles.label}>Thighs</Text>
            <TextInput
              style={styles.input}
              value={thighs}
              onChangeText={setThighs}
              keyboardType="decimal-pad"
              placeholder="cm"
              placeholderTextColor="#628B35"
            />
          </View>
          <View style={styles.measurementInput}>
            <Text style={styles.label}>Chest</Text>
            <TextInput
              style={styles.input}
              value={chest}
              onChangeText={setChest}
              keyboardType="decimal-pad"
              placeholder="cm"
              placeholderTextColor="#628B35"
            />
          </View>
        </View>

        <View style={styles.measurementsRow}>
          <View style={styles.measurementInput}>
            <Text style={styles.label}>Hips</Text>
            <TextInput
              style={styles.input}
              value={hips}
              onChangeText={setHips}
              keyboardType="decimal-pad"
              placeholder="cm"
              placeholderTextColor="#628B35"
            />
          </View>
          <View style={styles.measurementInput} />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>

        <View style={styles.exportSection}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={() => navigation.navigate('ExportData')}
          >
            <MaterialIcons name="file-download" size={24} color="#FFFDF5" />
            <Text style={styles.exportButtonText}>Export & Backup Data</Text>
            <MaterialIcons name="chevron-right" size={24} color="#FFFDF5" />
          </TouchableOpacity>
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
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#103713',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backButtonText: {
    color: '#E2DBD0',
    fontSize: 18,
    fontWeight: '600',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
    borderRadius: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFDF5',
    marginBottom: 4,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#E2DBD0',
    fontStyle: 'italic',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#103713',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#103713',
    borderWidth: 2,
    borderColor: '#628B35',
  },
  saveButton: {
    backgroundColor: '#628B35',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFDF5',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionDivider: {
    marginTop: 24,
    marginBottom: 16,
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: '#E2DBD0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#628B35',
    fontStyle: 'italic',
  },
  measurementsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  measurementInput: {
    flex: 1,
  },
  exportSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#E2DBD0',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#628B35',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#103713',
    gap: 12,
  },
  exportButtonText: {
    flex: 1,
    color: '#FFFDF5',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileScreen;

