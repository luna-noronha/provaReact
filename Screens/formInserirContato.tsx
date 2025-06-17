import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

export default function FormInserirContato({ navigation }) {
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');

  const inserirContato = async () => {
    if (!nome || !numero) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    try {
      await db.runAsync(
        'INSERT INTO contatos (nome, numero) VALUES (?, ?)', [nome, numero]
      );
      Alert.alert('Contato inserido com sucesso!');
      setNome('');
      setNumero('');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao inserir contato');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inserir Contato</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="phone-pad"
        placeholderTextColor="#888"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={inserirContato}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    elevation: 1,
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
