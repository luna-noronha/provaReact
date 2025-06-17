import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Lista from './Screens/lista';
import FormInserirContato from './Screens/formInserirContato';
import FormAtualizarContato from './Screens/formAtualizarContato';

const Stack = createStackNavigator();

function List({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lista Telefônica</Text>
      </View>
      <View style={styles.box}>
        <Lista navigation={navigation}/>
      </View>
      <TouchableOpacity
        style={styles.botaoInserir}
        onPress={() => navigation.navigate('FormInserirContato')}
      >
        <Text style={styles.botaoInserirTexto}>➕ Inserir Contato</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="list" component={List} />
        <Stack.Screen name="FormInserirContato" component={FormInserirContato} />
        <Stack.Screen name="FormAtualizarContato" component={FormAtualizarContato} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  box: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  botaoInserir: {
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
    elevation: 3,
  },
  botaoInserirTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
