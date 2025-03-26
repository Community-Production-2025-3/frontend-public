import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ChatInputProps {
  sendUserComment: (userComment: string) => void;
  openTodoDialog: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  sendUserComment,
  openTodoDialog,
}) => {
  const [inputText, setInputText] = useState<string>('');

  const isEmpty = !inputText.trim();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.inputContainer,
          { paddingBottom: Platform.OS === 'ios' ? 10 : 5 },
        ]}
      >
        <TextInput
          placeholder="メッセージを入力"
          onChangeText={setInputText}
          value={inputText}
          style={styles.textInput}
          autoCorrect={false}
          spellCheck={false}
          autoComplete="off"
          textContentType="none"
          importantForAutofill="no"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              sendUserComment(inputText);
              setInputText('');
              Keyboard.dismiss();
            }}
            disabled={isEmpty}
          >
            <Icon
              name="send"
              size={24}
              color={isEmpty ? '#CCCCCC' : '#007AFF'}
            />
          </TouchableOpacity>
          <View style={styles.buttonSpacer} />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={openTodoDialog}
            disabled={!isEmpty}
          >
            <Icon
              name="check-box"
              size={24}
              color={!isEmpty ? '#CCCCCC' : '#007AFF'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatInput;
