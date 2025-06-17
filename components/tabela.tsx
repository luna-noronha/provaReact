import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('database.db');

const Tabelas: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      await db.execAsync(
        'CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(100), numero varchar(100))'
      );
      console.log('Tabela criada');
    } catch (error) {
      console.error('Erro', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const rows = await db.getAllAsync('SELECT * FROM contatos;');
      setData(rows);
    } catch (error) {
      console.error('Erro ao buscar contatos', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contatos Salvos</Text>
      <TouchableOpacity style={styles.button} onPress={fetchContacts}>
        <Text style={styles.buttonText}>🔍 Buscar Contatos</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.nome} - {item.numero}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  text: {
    color: '#333',
    fontSize: 16,
  },
});

export default Tabelas;