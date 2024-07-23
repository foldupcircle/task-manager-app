import React, { useContext } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import ListItem from '@/components/ListItem';
import { TasksContext, Task } from '@/app/(tabs)/TasksProvider';

export default function CompletedTasksScreen() {
    const { tasks, toggleTaskCompletion, deleteTask } = useContext(TasksContext);
    
    return (
        <SafeAreaView style={styles.container}>
          {/* <FlatList
            data={tasks.filter(task => task.completed)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          /> */}
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
