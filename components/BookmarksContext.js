import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem('bookmarks');
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error("Failed to load bookmarks", error);
    }
  };

  const addBookmark = async (job) => {
    const newBookmarks = [...bookmarks, job];
    setBookmarks(newBookmarks);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, loadBookmarks }}>
      {children}
    </BookmarksContext.Provider>
  );
};
