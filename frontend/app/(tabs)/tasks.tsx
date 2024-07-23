import React, { useState, useContext } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ListItem from '@/components/ListItem';
import { ThemedText } from '@/components/ThemedText';
import { TasksContext, Task } from '@/app/(tabs)/TasksProvider';
import { ThemedView } from '@/components/ThemedView';
import { Snackbar } from 'react-native-paper';


export default function TasksScreen() {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useContext(TasksContext);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [lastToggledTask, setLastToggledTask] = useState<Task>();

  const handleAddTask = () => {
    if (newTaskDescription.trim() === '') return;
    addTask(newTaskDescription);
    setNewTaskDescription('');
  };

  const handleToggleTaskCompletion = (taskId: string) => {
    const task = tasks.find(task => task.id === taskId);
    setLastToggledTask(task);
    toggleTaskCompletion(taskId);
    setSnackbarVisible(true);
  };

  const handleUndo = () => {
    if (lastToggledTask) {
      toggleTaskCompletion(lastToggledTask.id);
      setSnackbarVisible(false);
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <ListItem task={item} onToggleTaskCompletion={handleToggleTaskCompletion} onDeleteTask={deleteTask}/>
    // <TaskItem task={item} onToggleTaskCompletion={handleToggleTaskCompletion} onDeleteTask={deleteTask} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Undo',
          onPress: handleUndo,
        }}
        duration={3000}
      >
        Task marked as completed
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999',
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    padding: 10,
  },
});
