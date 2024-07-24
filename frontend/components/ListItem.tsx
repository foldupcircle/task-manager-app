import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Task } from '@/app/(tabs)/TasksProvider'

interface TaskItemProps {
    task: Task;
    onToggleTaskCompletion: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void;
  }

export default function ListItem({ task, onToggleTaskCompletion, onDeleteTask, onEditTask }: TaskItemProps) {
    
  // Handles View when swiping right
  const swipeRight = (progress: Animated.AnimatedInterpolation<number>, 
        dragX: Animated.AnimatedInterpolation<number>) =>{
        const scale = dragX.interpolate({
            inputRange:[-1,0],
            outputRange:[1, 0.5],
            extrapolate:'clamp'
        });
        return(
            <Animated.View style={styles.deleteButton}>
                <Animated.Text style={styles.deleteIcon}>
                    <FontAwesome name='trash' size={24} color='white' />
                </Animated.Text>
            </Animated.View>
        );
    }
    
    return(
        // Required for Swipeable component
        <GestureHandlerRootView style={{flex: 1}}>
            {/* Swipeable component that enables ListItem to be swiped, calls delete function */}
            <Swipeable renderRightActions={swipeRight} leftThreshold={-10}
                onSwipeableOpen={(direction) => {
                    if (direction === "right") {
                        onDeleteTask(task.id);
                    }
                }}
            >
                {/* This whole thing is clickable to edit the task */}
                <TouchableOpacity onPress={() => onEditTask(task)}>
                    <Animated.View style={styles.taskItem}>
                        <View style={styles.taskContainer}>

                            {/* Checkbox */}
                            <CheckBox
                                checked={task.completed}
                                onPress={() => onToggleTaskCompletion(task.id)}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="black"
                                size={30}
                            />

                            {/* Task Title and Description */}
                            <View style={styles.taskTextContainer}>
                                <Text style={[styles.taskTitle, task.completed && styles.completedTask]}>
                                    {task.title}
                                </Text>
                                {task.description ? (
                                    <Text style={styles.taskDescription}>{task.description}</Text>
                                ) : null}
                            </View>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    taskItem: {
        flex: 1,
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: 'white',
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
    },
    taskTextContainer: {
        marginLeft: 0,
        flex: 1,
    },
    taskTitle: {
        fontSize: 20,
    },
    taskDescription: {
        fontSize: 14,
        color: '#aaa',
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    deleteButton: {
        backgroundColor: 'red',
        width: '100%',
        justifyContent: 'center',
    },
    deleteIcon: {
        marginLeft: 'auto',
        marginRight: 50,
        fontSize: 15,
        fontWeight: 'bold',
        transform: [{ scale: 1 }],
    },
    dueDateContainer: {
        backgroundColor: '#E0E0E0',
        padding: 5,
    },
    dueDateText: {
        fontSize: 12,
        color: '#555',
    },
});