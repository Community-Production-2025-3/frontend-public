import { useAppColors } from '@/hooks/useAppColors';
import { CreateTodo } from '@/types/todo';
import { styles } from '../style';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export const TodoForm = ({
  index,
  todo,
  updateTodo,
  removeTodo,
  disabled,
}: {
  index: number;
  todo: CreateTodo;
  updateTodo: (index: number, field: keyof CreateTodo, value: string) => void;
  removeTodo: (index: number) => void;
  disabled?: boolean;
}) => {
  const { modeColors } = useAppColors();
  return (
    <View key={index} style={styles.todoItem}>
      <View style={styles.todoInputContainer}>
        <Text style={[styles.label, { color: modeColors.text }]}>タイトル</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: modeColors.text,
            },
          ]}
          placeholder="Todoのタイトル"
          placeholderTextColor={modeColors.text}
          value={todo.title}
          onChangeText={(text) => updateTodo(index, 'title', text)}
          editable={!disabled}
        />
      </View>

      <View style={styles.todoInputContainer}>
        <Text style={[styles.label, { color: modeColors.text }]}>
          所要時間（分）
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              color: modeColors.text,
            },
          ]}
          placeholder="分"
          placeholderTextColor={modeColors.text}
          value={
            todo.minutes === 0 && todo.minutes.toString() === '0'
              ? ''
              : todo.minutes.toString()
          }
          onChangeText={(text) => updateTodo(index, 'minutes', text)}
          keyboardType="numeric"
          editable={!disabled}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.removeButton,
          { backgroundColor: '#ff6b6b' },
          disabled && { opacity: 0.7 },
        ]}
        onPress={() => removeTodo(index)}
        disabled={disabled}
      >
        <Text style={styles.removeButtonText}>削除</Text>
      </TouchableOpacity>
    </View>
  );
};
