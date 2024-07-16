import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

 
  const fetchJobs = useCallback(async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`);
      return response.data.results;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  
  const fetchData = useCallback(async () => {
    try {
      const data = await fetchJobs(1);
      setJobs(data);
      setPage(2); 
    } catch (error) {
      setError(error.message);
    }
  }, [fetchJobs]);

 
  const loadMoreData = useCallback(async () => {
    if (loading || isEndReached) return;

    try {
      const data = await fetchJobs(page);
      if (data.length > 0) {
        setJobs(prevJobs => [...prevJobs, ...data]);
        setPage(prevPage => prevPage + 1);
      } else {
        setIsEndReached(true); 
      }
    } catch (error) {
      setError(error.message);
    }
  }, [fetchJobs, loading, page, isEndReached]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchData]);

  const bookmarkJob = async (job) => {
    try {
      let bookmarkedJobs = await AsyncStorage.getItem('bookmarkedJobs');
      bookmarkedJobs = bookmarkedJobs ? JSON.parse(bookmarkedJobs) : [];
      bookmarkedJobs.push(job);
      await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
      alert('Job bookmarked!');
    } catch (error) {
      console.error('Error bookmarking job:', error);
    }
  };


  const renderJob = ({ item }) => (
    <View style={styles.jobCard}>
      <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })} style={styles.jobDetail}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.jobLocation}>Location: {item.primary_details?.Place}</Text>
        <Text style={styles.jobDetail}>Salary: {item.primary_details?.Salary}</Text>
        <Text style={styles.jobDetail}>Phone: {item.whatsapp_no}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => bookmarkJob(item)} style={styles.bookmarkButton}>
        <Text style={styles.bookmarkButtonText}>Bookmark</Text>
      </TouchableOpacity>
    </View>
  );

 
  const keyExtractor = useCallback((item, index) => {
    return item.id?.toString() || `fallback_${index}`;
  }, []);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <FlatList
        data={jobs}
        renderItem={renderJob}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<View style={styles.emptyContainer}><Text>No jobs found.</Text></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    alignSelf: 'center',
    marginVertical: 20,
    color: 'red',
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
    marginBottom: 5,
  },
  jobDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  bookmarkButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  bookmarkButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default JobScreen;
