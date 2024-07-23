import React, { useState, useContext } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ListItem from '@/components/ListItem';
import { ThemedText } from '@/components/ThemedText';
import { TasksContext, Task } from '@/app/(tabs)/TasksProvider';
import { ThemedView } from '@/components/ThemedView';
import { Snackbar } from 'react-native-paper';
import EditTaskModal from '@/components/EditTaskModal';


export default function TasksScreen() {
  const { tasks, addTask, toggleTaskCompletion, deleteTask, updateTask } = useContext(TasksContext);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [lastToggledTask, setLastToggledTask] = useState<Task>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleSaveTask = (taskId: string, newDescription: string) => {
    updateTask(taskId, newDescription);
    setSelectedTask(null);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <ListItem task={item} onToggleTaskCompletion={handleToggleTaskCompletion} onDeleteTask={deleteTask} onEditTask={handleEditTask}/>
    // <TaskItem task={item} onToggleTaskCompletion={handleToggleTaskCompletion} onDeleteTask={deleteTask} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Tasks!</ThemedText>
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
        style={styles.snackbar}
      >
        Task marked as completed
      </Snackbar>
      {selectedTask && (
        <EditTaskModal
          visible={true}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleSaveTask}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    borderColor: '#6200EE',
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    padding: 10,
    backgroundColor: '#6200EE',
  },
  snackbar: {
    backgroundColor: '#6200EE',
  }
});
