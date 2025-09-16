import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react'
import { Plus } from 'lucide-react-native';
export default function App() {
  const [visible, setVisible] = useState(false)
  const [importance, setImportance] = useState(null)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active tasks:</Text>
      <TouchableOpacity
        style={styles.addTask_btn}
        onPress={() => setVisible(true)}
      >
        <Text>
          <Plus color="#fff" size={36} />
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 360 }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>Let's create a new task! 👋</Text>
            <TextInput placeholder='Task name' style={styles.textInput} />
            <TextInput placeholder='Task description' style={styles.textInput} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 80,
    position: 'relative',
    width: '100%'
  },
  title: {
    fontSize: 28,
    color: '#141414ff',
    fontWeight: '700',
  },
  addTask_btn: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#2a2fadff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 50,
    boxShadow: '3px 5px 5px #00000038'
  },
  textInput: {
    width: 'full',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginTop: 15
  },

});
