import React, { useState, useContext } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import ListItem from '@/components/ListItem';
import { ThemedText } from '@/components/ThemedText';
import { TasksContext, Task } from '@/app/(tabs)/TasksProvider';
import { ThemedView } from '@/components/ThemedView';
import { Snackbar } from 'react-native-paper';
import EditTaskModal from '@/components/EditTaskModal';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function TasksScreen() {
  const { tasks, addTask, toggleTaskCompletion, deleteTask, updateTask } = useContext(TasksContext);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState<string | null>('');
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [lastToggledTask, setLastToggledTask] = useState<Task>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Handling the addition of a task
  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;
    addTask(newTaskTitle, newTaskDueDate?.toString() || null, newTaskDescription || null);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate(null);
  };

  // Handling marking a task complete
  const handleToggleTaskCompletion = (taskId: string) => {
    const task = tasks.find(task => task.id === taskId);
    setLastToggledTask(task);
    toggleTaskCompletion(taskId);
    setSnackbarVisible(true);
  };

  // Handling task undo on popup
  const handleUndo = () => {
    if (lastToggledTask) {
      toggleTaskCompletion(lastToggledTask.id);
      setSnackbarVisible(false);
    }
  };

  // Handling Edit Modal Cancel Button
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  // Handling Edit Modal Save Button
  const handleSaveTask = (taskId: string, title: string, dueDate: string | null, description: string | null) => {
    updateTask(taskId, title, dueDate, description);
    setSelectedTask(null);
  };

  // Grouping Tasks by Date and Rendering Them with the ListItem Component
  const groupTasksByDueDate = (tasks: Task[]) => {
    const grouped: { [key: string]: Task[] } = {};
    tasks.forEach(task => {
      const dateKey = task.dueDate ? new Date(task.dueDate).toDateString() : 'No Due Date';
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(task);
    });
    return grouped;
  };
  // .filter(task => !task.completed)
  const groupedTasks = groupTasksByDueDate(tasks);

  const renderGroup = ({ item }: { item: [string, Task[]] }) => (
    <View>
      <ThemedText type="subtitle" style={styles.dateBanner}>{item[0]}</ThemedText>
      {item[1].map(task => (
        <ListItem
          key={task.id}
          task={task}
          onToggleTaskCompletion={handleToggleTaskCompletion}
          onDeleteTask={deleteTask}
          onEditTask={handleEditTask}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" lightColor='#fff'>Your Tasks!</ThemedText>
      </ThemedView>

      {/* Add Task Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Task Title"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="New Task Description"
          value={newTaskDescription || ''}
          onChangeText={setNewTaskDescription}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Ionicons name="add-circle-outline" size={36} color="#6200EE" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={Object.entries(groupedTasks)}
        renderItem={renderGroup}
        keyExtractor={item => item[0]}
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

      {/* Popup after Task is Completed */}
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
  dateBanner: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#6200EE',
  },
  addButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
});
