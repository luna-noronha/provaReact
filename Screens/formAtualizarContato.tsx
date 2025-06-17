import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

export default function FormAtualizarContato({ route, navigation }) {
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (route.params) {
      setNome(route.params.nome);
      setNumero(route.params.numero);
      setId(route.params.id);
    }
  }, [route.params]);

  const atualizarContato = async () => {
    if (!nome || !numero) {
      Alert.alert('Preencha todos os campos!');
      return;
    }
    try {
      await db.runAsync(
        'UPDATE contatos SET nome = ?, numero = ? WHERE id = ?', [nome, numero, id]
      );
      Alert.alert('Contato atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao atualizar contato');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Contato</Text>
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
        onPress={atualizarContato}
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
