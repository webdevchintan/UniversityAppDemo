import { createNavigationContainerRef } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// navigation ref
export const navigationRef = createNavigationContainerRef(); 

// Function to perform GET API call
export const getAPI = async ({ apiUrl }: { apiUrl: string }) => {
    try {
        // Attempt to fetch data from the provided API URL
        const response = await fetch(apiUrl);
        const json = await response.json();
        return json
    } catch (error) {
        // Log any errors to the console
        console.error(error);
    }
};

// Function to store data locally
export const storeLocalData = async (key : string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.log('Saving Error')
    }
};

// Function to retrieve local data
export const getLocalData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log('error reading value')
    }
};