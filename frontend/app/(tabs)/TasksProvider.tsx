import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface TasksContextProps {
  tasks: Task[];
  addTask: (description: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

const defaultValue: TasksContextProps = {
    tasks: [],
    addTask: () => {},
    toggleTaskCompletion: () => {},
    deleteTask: () => {},
  };

export const TasksContext = createContext<TasksContextProps>(defaultValue);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks.', error);
    }
  };

  const saveTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks.', error);
    }
  };

  const addTask = (description: string) => {
    const newTask = {
      id: Date.now().toString(),
      description,
      completed: false,
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTimeout(() => {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }, 100);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
