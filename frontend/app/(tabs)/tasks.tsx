import React, { useState, useContext } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TaskItem from '@/components/TaskItem';
import { TasksContext, Task } from '@/app/(tabs)/TasksProvider';

export default function TasksScreen() {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useContext(TasksContext);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = () => {
    if (newTaskDescription.trim() === '') return;
    addTask(newTaskDescription);
    setNewTaskDescription('');
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem task={item} onToggleTaskCompletion={toggleTaskCompletion} onDeleteTask={deleteTask} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Task"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
        />
        <Button title="Add" onPress={handleAddTask} />
      </View>
      <FlatList
        data={tasks.filter(task => !task.completed)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
    borderRadius: 4,
  },
});
