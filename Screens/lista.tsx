import { React, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { Linking } from 'react-native';

const db = SQLite.openDatabaseSync('database.db');

type Contato = {
  id: number;
  nome: string;
  numero: string;
};

export default function Lista() {
  const [contatos, setContatos] = useState<Contato[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchContatos();
    }, [])
  );

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

  const fetchContatos = async () => {
    try {
      const rows: Contato[] = await db.getAllAsync('SELECT * FROM contatos ORDER BY nome');
      setContatos(rows);
    } catch (error) {
      console.error('Erro ao buscar contatos', error);
    }
  };

  const deletarContato = async (id: number) => {
    try {
      await db.runAsync('DELETE FROM contatos WHERE id = ?', [id]);
      fetchContatos(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao deletar contato', error);
    }
  };

  const confirmarExclusao = (id: number) => {
    Alert.alert(
      'Excluir Contato',
      'Tem certeza que deseja excluir este contato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => deletarContato(id) },
      ]
    );
  };

  const editarContato = (contato: Contato) => {
    Alert.prompt(
      'Editar Nome',
      `Altere o nome de ${contato.nome}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salvar',
          onPress: async (novoNome) => {
            if (novoNome?.trim()) {
              try {
                await db.runAsync('UPDATE contatos SET nome = ? WHERE id = ?', [novoNome.trim(), contato.id]);
                fetchContatos();
              } catch (error) {
                console.error('Erro ao editar contato', error);
              }
            }
          },
        },
      ],
      'plain-text',
      contato.nome
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.lista}
      data={contatos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.contato}>
          <View style={styles.infoContainer}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.telefone}>{item.numero}</Text>
          </View>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => Linking.openURL(`tel:${item.numero}`)}>
            <Text style={styles.botaoTexto}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => editarContato(item)}>
            <Text style={styles.botaoTexto}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaoExcluir}
            onPress={() => confirmarExclusao(item.id)}>
            <Text style={styles.botaoTexto}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: 16,
    backgroundColor: '#f5f7fa',
  },
  contato: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  telefone: {
    fontSize: 16,
    color: '#666',
  },
  botao: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  botaoEditar: {
    backgroundColor: '#2196f3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  botaoExcluir: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
