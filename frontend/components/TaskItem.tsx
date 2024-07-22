import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface TaskItemProps {
    task: {
      id: string;
      description: string;
      completed: boolean;
    };
    onToggleTaskCompletion: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleTaskCompletion, onDeleteTask }) => {
    return (
        <View style={styles.taskContainer}>
        <Checkbox
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={() => onToggleTaskCompletion(task.id)}
        />
        <Text style={[styles.taskDescription, task.completed && styles.completedTask]}>
            {task.description}
        </Text>
        <Button title="Delete" onPress={() => onDeleteTask(task.id)} />
        </View>
    );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  taskDescription: {
    marginLeft: 10,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default TaskItem;
