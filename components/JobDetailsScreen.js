import React from 'react';
import { View, Text } from 'react-native';

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text>{job.title}</Text>
      <Text>{job.primary_details.Place}</Text>
      <Text>{job.primary_details.Salary}</Text>
      <Text>{job.primary_details.Job_Type}</Text>
      <Text>{job.primary_details.Experience}</Text>
      <Text>{job.primary_details.Qualification}</Text>
      <Text>{job.custom_link}</Text>
    </View>
  );
};

export default JobDetailsScreen;
