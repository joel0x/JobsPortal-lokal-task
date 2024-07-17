import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Place:</Text>
        <Text style={styles.value}>{job.primary_details.Place}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Salary:</Text>
        <Text style={styles.value}>{job.primary_details.Salary}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Job Type:</Text>
        <Text style={styles.value}>{job.primary_details.Job_Type}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Experience:</Text>
        <Text style={styles.value}>{job.primary_details.Experience}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Qualification:</Text>
        <Text style={styles.value}>{job.primary_details.Qualification}</Text>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(job.custom_link)}>
        <Text style={styles.link}>More Information</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    marginLeft: 10,
    color: '#777',
  },
  link: {
    color: '#1e90ff',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default JobDetailsScreen;
