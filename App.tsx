import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainMenuScreen } from './src/screens/MainMenuScreen';
import { GenSelectScreen } from './src/screens/GenSelectScreen';
import { BattleSetupScreen } from './src/screens/BattleSetupScreen';
import { BattleScreen } from './src/screens/BattleScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { TeamBuilderScreen } from './src/screens/TeamBuilderScreen';
import { SandboxSetupScreen } from './src/screens/SandboxSetupScreen';
import { RootStackParamList } from './src/types/Navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" hidden />
        <Stack.Navigator
          initialRouteName="MainMenu"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: { backgroundColor: '#0F172A' },
          }}
        >
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
          <Stack.Screen name="GenSelect" component={GenSelectScreen} />
          <Stack.Screen name="Setup" component={BattleSetupScreen} />
          <Stack.Screen name="Battle" component={BattleScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="TeamBuilder" component={TeamBuilderScreen} />
          <Stack.Screen name="SandboxSetup" component={SandboxSetupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
