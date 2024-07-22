import React from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import { CheckBox } from '@rneui/themed';

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
        <CheckBox
            checked={task.completed}
            onPress={() => onToggleTaskCompletion(task.id)}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor='black'
            size={30}
        />
      {/* <CustomCheckbox
        checked={task.completed}
        onPress={() => onToggleTaskCompletion(task.id)}
      /> */}
      <Text style={[styles.taskDescription, task.completed && styles.completedTask]}>
        {task.description}
      </Text>
      <Button title="Delete" onPress={() => onDeleteTask(task.id)} color="#ff0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  taskDescription: {
    marginLeft: 0,
    fontSize: 16,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default TaskItem;
