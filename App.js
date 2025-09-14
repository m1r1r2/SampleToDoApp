import { StatusBar } from 'expo-status-bar';
import React, { useEffect ,useState} from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { promptBiometric } from './src/auth/LocalAuth';
import { TodoProvider } from './src/context/ToContextApi';
import TodoListScreen from './src/TodoListScreen';

export default function App() {
   // Track whether authentication has been checked at app startup
  const [authChecked, setAuthChecked] = useState(false);

    // Track if the user successfully authenticated
  const [authenticated, setAuthenticated] = useState(false);
 
  // Run biometric authentication when the app first loads
  useEffect(()=>{
    (async ()=>{
      const res = await promptBiometric();
      if(res.success){
        setAuthenticated(true);
      }
      setAuthChecked(true)

    })();

  },[]);

// Show loading state while authentication is being checked
  if (!authChecked) {
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     
        <Text style={{ marginTop: 10 }}>Checking authentication…</Text>
      </View>
    );
  }

  // If authentication fails → block the app and show a failure message
  if (!authenticated) {
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Authentication failed. Please restart the app.</Text>
      </View>
    );
  }
  // If authentication is successful → render the main Todo app
  return (
    <TodoProvider>
      <View style ={styles.container}>
         <TodoListScreen/>
      </View>

    </TodoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex :1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop : 30,
    padding :10

   
  },
});
