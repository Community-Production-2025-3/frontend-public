import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, Menu } from 'react-native-paper';
import { Todo, TodoStatus } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (status: TodoStatus) => void;
}

export default function TodoItem({ todo, onStatusChange }: TodoItemProps) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const getStatusLabel = (status: TodoStatus): string => {
    switch (status) {
      case TodoStatus.yet:
        return '未完了';
      case TodoStatus.inProgress:
        return '進行中';
      case TodoStatus.done:
        return '完了';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: TodoStatus): string => {
    switch (status) {
      case TodoStatus.yet:
        return '#FFA726'; // Orange
      case TodoStatus.inProgress:
        return '#42A5F5'; // Blue
      case TodoStatus.done:
        return '#66BB6A'; // Green
      default:
        return '#9E9E9E'; // Grey
    }
  };

  const handleStatusChange = (newStatus: TodoStatus) => {
    onStatusChange(newStatus);
    closeMenu();
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium">{todo.title}</Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(todo.status) },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {getStatusLabel(todo.status)}
                  </Text>
                </View>
              </TouchableOpacity>
            }
          >
            {todo.status !== TodoStatus.yet && (
              <Menu.Item
                title="未完了"
                onPress={() => handleStatusChange(TodoStatus.yet)}
              />
            )}
            {todo.status !== TodoStatus.inProgress && (
              <Menu.Item
                title="進行中"
                onPress={() => handleStatusChange(TodoStatus.inProgress)}
              />
            )}
            {todo.status !== TodoStatus.done && (
              <Menu.Item
                title="完了"
                onPress={() => handleStatusChange(TodoStatus.done)}
              />
            )}
          </Menu>
        </View>

        <Text variant="bodyMedium">所要時間: {todo.minutes} 分</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
