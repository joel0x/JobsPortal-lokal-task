import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import JobScreen from './components/JobScreen';
import BookmarkScreen from './components/BookmarkScreen'
import JobDetailsScreen from './components/JobDetailsScreen';
import { BookmarksProvider } from './components/BookmarksContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function JobStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="JobList" component={JobScreen} options={{ title: 'Jobs' }} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} options={{ title: 'Job Details' }} />
    </Stack.Navigator>
  );
}

function BookmarkStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookmarkList" component={BookmarkScreen} options={{ title: 'Bookmarks' }} />
      <Stack.Screen name="BookmarkJobDetails" component={JobDetailsScreen} options={{ title: 'Job Details' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <BookmarksProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Find Jobs"
            component={JobStack}
            options={{
              tabBarLabel: 'Jobs',
              tabBarIcon: ({ focused, color, size }) => null,
              tabBarLabelStyle: { fontSize: 23 }, 
            }}
          />
          <Tab.Screen
            name="Your Bookmarks"
            component={BookmarkStack}
            options={{
              tabBarLabel: 'Bookmarks',
              tabBarIcon: ({ focused, color, size }) => null, 
              tabBarLabelStyle: { fontSize: 23 },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </BookmarksProvider>
  );
}
