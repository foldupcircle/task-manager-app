import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definition of a Task
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string | null;
  description: string | null;
}

// Task Functions and Task List
interface TasksContextProps {
  tasks: Task[];
  addTask: (title: string, dueDate: string | null, description: string | null) => void;
  toggleTaskCompletion: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, title: string, dueDate: string | null, description: string | null) => void;
}

const defaultValue: TasksContextProps = {
    tasks: [],
    addTask: () => {},
    toggleTaskCompletion: () => {},
    deleteTask: () => {},
    updateTask: () => {},
  };

export const TasksContext = createContext<TasksContextProps>(defaultValue);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  // Load Tasks from Storage
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

  // Save Tasks to Storage
  const saveTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks.', error);
    }
  };

  // Add Task to task list and save them
  const addTask = (title: string, dueDate: string | null, description: string | null) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
      dueDate,
      description,
  };

    const updatedTasks = [newTask, ...tasks].sort((a, b) => (a.dueDate && b.dueDate ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : 0));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Handles checking the checkbox
  const toggleTaskCompletion = (taskId: string) => {
    setTimeout(() => {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ).sort((a, b) => (a.dueDate && b.dueDate ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : 0));
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }, 100);
  };

  // Handles Task Deletion
  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId).sort((a, b) => (a.dueDate && b.dueDate ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : 0));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Handles Editing Task After Task has already been created
  const updateTask = (taskId: string, title: string, dueDate: string | null, description: string | null) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, title, dueDate, description } : task
    ).sort((a, b) => (a.dueDate && b.dueDate ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : 0));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
};
