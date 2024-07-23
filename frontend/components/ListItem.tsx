import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface TaskItemProps {
    task: {
      id: string;
      description: string;
      completed: boolean;
    };
    onToggleTaskCompletion: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
  }

export default function ListItem({ task, onToggleTaskCompletion, onDeleteTask }: TaskItemProps) {
    const swipeRight = (progress: Animated.AnimatedInterpolation<number>, 
        dragX: Animated.AnimatedInterpolation<number>) =>{
        const scale = dragX.interpolate({
          inputRange:[-1,0],
          outputRange:[1, 0.5],
          extrapolate:'clamp'
        });
        return(
          <Animated.View style={{backgroundColor:'red',width:'100%',justifyContent:'center'}}>
            <Animated.Text style={{marginLeft:'auto',marginRight:50, fontSize:15, fontWeight:'bold',transform:[{scale}]}}>
                <FontAwesome name='trash' size={24} color='white' />
            </Animated.Text>
          </Animated.View>
        );
      }
    
    return(
        <GestureHandlerRootView style={{flex: 1}}>
        <Swipeable renderRightActions={swipeRight} leftThreshold={-10}
            onSwipeableOpen={(direction) => {
                    if (direction === "right") {
                        onDeleteTask(task.id);
                    }
                }}
        >
            <Animated.View style={{flex:1,flexDirection:'row', height:70, alignItems:'center',borderBottomWidth:1,backgroundColor:'white'}}>
                <View style={styles.taskContainer}>
                    <CheckBox
                        checked={task.completed}
                        onPress={() => onToggleTaskCompletion(task.id)}
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checkedColor="black"
                        size={30}
                    />
                    <Text style={[styles.taskDescription, task.completed && styles.completedTask]}>
                        {task.description}
                    </Text>
                </View>
            </Animated.View>
        </Swipeable>
        </GestureHandlerRootView>
    );
  }

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
      fontSize: 20,
      flex: 1,
    },
    completedTask: {
      textDecorationLine: 'line-through',
      color: '#aaa',
    },
    deleteButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      flex: 1,
    },
    deleteButtonOld: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: '100%',
    },
    deleteDescription: {
      paddingHorizontal: 30,
      paddingRight: 20,
      paddingVertical: 20,
      fontWeight: '600',
      color: 'black',
    }
  });
