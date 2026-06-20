import React, { Suspense, lazy } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainMenuScreen } from './src/screens/MainMenuScreen';
import { RootStackParamList } from './src/types/Navigation';

// Only the main menu is loaded eagerly. Every other screen (and the heavy sprite
// / cry / move data it imports — thousands of require()s) is code-split behind
// React.lazy so the app reaches the first frame without evaluating any of it.
// The standalone build's cold start used to pay for all of it up front.
const lazyScreen = (
  factory: () => Promise<{ default: React.ComponentType<any> }>,
): React.ComponentType<any> => {
  const Lazy = lazy(factory);
  return (props: any) => (
    <Suspense fallback={<View style={{ flex: 1, backgroundColor: '#0F172A' }} />}>
      <Lazy {...props} />
    </Suspense>
  );
};

const GenSelectScreen     = lazyScreen(() => import('./src/screens/GenSelectScreen').then(m => ({ default: m.GenSelectScreen })));
const BattleSetupScreen   = lazyScreen(() => import('./src/screens/BattleSetupScreen').then(m => ({ default: m.BattleSetupScreen })));
const BattleScreen        = lazyScreen(() => import('./src/screens/BattleScreen').then(m => ({ default: m.BattleScreen })));
const ResultsScreen       = lazyScreen(() => import('./src/screens/ResultsScreen').then(m => ({ default: m.ResultsScreen })));
const TeamBuilderScreen   = lazyScreen(() => import('./src/screens/TeamBuilderScreen').then(m => ({ default: m.TeamBuilderScreen })));
const SandboxSetupScreen  = lazyScreen(() => import('./src/screens/SandboxSetupScreen').then(m => ({ default: m.SandboxSetupScreen })));
const PokemonGalleryScreen = lazyScreen(() => import('./src/screens/PokemonGalleryScreen').then(m => ({ default: m.PokemonGalleryScreen })));
const SettingsScreen       = lazyScreen(() => import('./src/screens/SettingsScreen').then(m => ({ default: m.SettingsScreen })));

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
          <Stack.Screen name="PokemonGallery" component={PokemonGalleryScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
