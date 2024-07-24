import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, StyleSheet, Button } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Task } from '@/app/(tabs)/TasksProvider'
import DateTimePicker from '@react-native-community/datetimepicker';

interface EditTaskModalProps {
  visible: boolean;
  task: Task;
  onClose: () => void;
  onSave: (taskId: string, title: string, dueDate: string | null, description: string | null) => void;
}

export default function EditTaskModal({ visible, task, onClose, onSave }: EditTaskModalProps) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState<string | null>(task.description);
    const [dueDate, setDueDate] = useState<Date | null>(task.dueDate ? new Date(task.dueDate) : null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate ? new Date(task.dueDate) : null);
    }, [task]);

    // Save Edits Made
    const handleSave = () => {
    onSave(task.id, title, dueDate?.toISOString() || null, description);
    onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
            <ThemedView style={styles.card}>
                {/* Modal Title */}
                <ThemedText type="title">Edit Task</ThemedText>

                {/* Task Title Text Input */}
                <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
                />

                {/* Description Text Input */}
                <TextInput
                style={styles.input}
                value={description || ''}
                onChangeText={setDescription}
                placeholder="Description"
                multiline
                />

                {/* Button and Functionality to Set a Due Date for task */}
                <Button title="Set Due Date" onPress={() => setShowDatePicker(true)} color="#6200EE" />
                {showDatePicker && (
                <DateTimePicker
                    value={dueDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || dueDate;
                    setShowDatePicker(false);
                    setDueDate(currentDate);
                    }}
                />
                )}

                {/* Buttons for Saving or Canceling Changes */}
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
