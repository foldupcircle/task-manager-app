import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, StyleSheet, Button } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface EditTaskModalProps {
  visible: boolean;
  task: {
    id: string;
    description: string;
  };
  onClose: () => void;
  onSave: (taskId: string, newDescription: string) => void;
}

export default function EditTaskModal({ visible, task, onClose, onSave }: EditTaskModalProps) {
  const [newDescription, setNewDescription] = useState(task.description);

  useEffect(() => {
    setNewDescription(task.description);
  }, [task]);

  const handleSave = () => {
    onSave(task.id, newDescription);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <ThemedView style={styles.card}>
          <ThemedText type="title">Edit Task</ThemedText>
          <TextInput
            style={styles.input}
            value={newDescription}
            onChangeText={setNewDescription}
          />
          <Button title="Save" onPress={handleSave} color="#6200EE" />
          <Button title="Cancel" onPress={onClose} color="#6200EE" />
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  card: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderColor: '#6200EE',
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
});
