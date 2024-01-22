// App.tsx

import React from 'react';
import AppNavigator from './src/navigation';
import { LogBox, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Main App Component
const App: React.FC = () => (
  <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1}}>
      <AppNavigator />
    </SafeAreaView>
  </SafeAreaProvider>
);

// disable the logs for dependancy
LogBox.ignoreLogs(['']);
export default App;
