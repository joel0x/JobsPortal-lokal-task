import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarkScreen = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarkedJobs();
  }, []);

  const fetchBookmarkedJobs = async () => {
    try {
      const jobs = await AsyncStorage.getItem('bookmarkedJobs');
      if (jobs !== null) {
        setBookmarkedJobs(JSON.parse(jobs));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookmarked jobs:', error);
      setLoading(false);
    }
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobLocation}>{item.primary_details?.Place}</Text>
      <Text style={styles.jobSalary}>{item.primary_details?.Salary}</Text>
      <Text style={styles.jobPhone}>{item.contact_preference?.whatsapp_no}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (bookmarkedJobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No bookmarked jobs available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderJobItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
  },
  jobSalary: {
    fontSize: 14,
    color: '#666',
  },
  jobPhone: {
    fontSize: 14,
    color: '#666',
  },
});

export default BookmarkScreen;
