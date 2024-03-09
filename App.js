import React from 'react';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './src/navigations/RootNavigator';
import { OriginContextProvider,DestinationContextProvider } from './src/contexts/contexts';



/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
  return (
    <DestinationContextProvider>
    <OriginContextProvider>
        <RootNavigator />
    </OriginContextProvider>
   </DestinationContextProvider>
   
  );
}; 

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 