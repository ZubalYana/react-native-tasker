import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Animated, } from 'react-native';
import { useState, useEffect, useRef } from 'react'
import { Plus, X, Settings2, CheckSquare, Square } from 'lucide-react-native';
import DropDownPicker from "react-native-dropdown-picker";
export default function App() {
  const [visible, setVisible] = useState(false);
  const [importance, setImportance] = useState(null);
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [tasks, setTasks] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [selectedTheme, setSelectedTheme] = useState("Minimalictic");
  useEffect(() => {
    if (importance) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
  }, [importance])
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Minimalistic");
  const [items, setItems] = useState([
    { label: "Minimalistic", value: "Minimalistic" },
    { label: "Colored", value: "Colored" },
  ]);

  const createTask = () => {
    setTasks([...tasks, {
      name: taskName,
      description: taskDescription,
      importance: importance,
      completed: false
    }]);
    setVisible(false);
    setTaskName('');
    setTaskDescription('');
    setImportance(null);
  };

  useEffect(() => {
    console.log("Updated tasks:", tasks);
  }, [tasks]);

  const toggleTaskCompletion = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };


  return (
    <View style={styles.container}>

      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.title}>Active tasks:</Text>
        <TouchableOpacity
          onPress={() => setShowSettings(true)}
          style={{ padding: 6 }}
        >
          <Settings2 size={24} color="#000" />
        </TouchableOpacity>


      </View>
      <TouchableOpacity
        style={styles.addTask_btn}
        onPress={() => setVisible(true)}
      >
        <Text>
          <Plus color="#fff" size={36} />
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        {value === "Minimalistic" && (
          tasks.map((task, index) => (
            <TouchableOpacity key={index} onPress={() => {
              setSelectedTask(task);
              setShowTaskModal(true);
            }}>
              <View
                style={{
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: "#f5f5f5",
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      textDecorationLine: task.completed ? "line-through" : "none",
                      color: task.completed ? "#888" : "#000"
                    }}
                  >
                    {task.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#555", marginTop: 3 }}>
                    {task.description}
                  </Text>
                  <Text style={{ marginTop: 4, fontWeight: "500" }}>
                    Importance:
                    <Text style={{ color: task.importance === "Low" ? "#4caf50" : task.importance === "Medium" ? "#ff9800" : "#f44336" }}>
                      {" "}{task.importance}
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
                  {task.completed ? (
                    <CheckSquare size={28} color="#4caf50" />
                  ) : (
                    <Square size={28} color="#555" />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
        {value === "Colored" && (
          tasks.map((task, index) => {
            const bgColor =
              task.importance === "Low"
                ? "#4caf50"
                : task.importance === "Medium"
                  ? "#ff9800"
                  : "#f44336";

            return (
              <TouchableOpacity key={index} onPress={() => {
                setSelectedTask(task);
                setShowTaskModal(true);
              }}>
                <View

                  style={{
                    padding: 16,
                    borderRadius: 10,
                    backgroundColor: bgColor,
                    marginBottom: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        textDecorationLine: task.completed ? "line-through" : "none",
                        color: "#fff"
                      }}
                    >
                      {task.name}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#f0f0f0", marginTop: 4 }}>
                      {task.description}
                    </Text>
                    <Text style={{ marginTop: 6, fontWeight: "600", color: "#fff" }}>
                      Importance: {task.importance}
                    </Text>
                  </View>

                  <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
                    {task.completed ? (
                      <CheckSquare size={28} color="#fff" />
                    ) : (
                      <Square size={28} color="#fff" />
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        )}

      </View>

      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 360 }}>
            <X color="#000" size={24} style={{ position: "absolute", top: 15, right: 15 }} onPress={() => setVisible(false)} />

            <Text style={{ fontSize: 20, fontWeight: '600' }}>Let's create a new task! 👋</Text>
            <TextInput placeholder='Task name' style={styles.textInput} onChangeText={setTaskName} />
            <TextInput placeholder='Task description' style={styles.textInput} onChangeText={setTaskDescription} />
            <Text style={{ marginTop: 15, marginBottom: 6, fontWeight: '600' }}>
              Select importance:
            </Text>

            <View style={styles.importanceRow}>
              {["Low", "Medium", "High"].map((level, idx) => (
                <Animated.View key={idx} style={{ transform: [{ scale: importance === level ? scaleAnim : 1 }] }}>
                  <TouchableOpacity
                    style={[
                      styles.importanceBtn,
                      importance === level && styles.importanceSelected(level),
                    ]}
                    onPress={() => setImportance(level)}
                  >
                    <Text style={{ color: '#fff' }}>{level}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            <TouchableOpacity style={styles.createBtn} onPress={createTask}>
              <Text style={styles.createBtnText}>Create</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <Modal visible={showSettings} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 360 }}>
            <X color="#000" size={24} style={{ position: "absolute", top: 15, right: 15 }} onPress={() => setShowSettings(false)} />
            <Text style={{ marginTop: 15, marginBottom: 6, fontWeight: '600' }}>
              Tasks theme:
            </Text>
            <View style={{ padding: 20 }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select theme"
                style={{ borderColor: "#aaa" }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={showTaskModal} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{
            backgroundColor: "#fff",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            minHeight: 500
          }}>
            <TouchableOpacity onPress={() => setShowTaskModal(false)} style={{ position: "absolute", right: 15, top: 15 }}>
              <X size={24} color="#000" />
            </TouchableOpacity>

            {selectedTask && (
              <>
                <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 10 }}>
                  {selectedTask.name}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>
                  {selectedTask.description}
                </Text>
                <Text style={{ fontWeight: "600", marginBottom: 20 }}>
                  Importance:{" "}
                  <Text style={{
                    color: selectedTask.importance === "Low" ? "#4caf50" :
                      selectedTask.importance === "Medium" ? "#ff9800" : "#f44336"
                  }}>
                    {selectedTask.importance}
                  </Text>
                </Text>

                <TextInput
                  placeholder="Edit task name"
                  value={selectedTask.name}
                  onChangeText={(text) => setSelectedTask({ ...selectedTask, name: text })}
                  style={styles.textInput}
                />
                <TextInput
                  placeholder="Edit description"
                  value={selectedTask.description}
                  onChangeText={(text) => setSelectedTask({ ...selectedTask, description: text })}
                  style={styles.textInput}
                />

                <TouchableOpacity
                  style={[styles.createBtn, { marginTop: 20, backgroundColor: "#4caf50" }]}
                  onPress={() => {
                    const updated = tasks.map((t) =>
                      t === selectedTask ? selectedTask : t
                    );
                    setTasks(updated);
                    setShowTaskModal(false);
                  }}
                >
                  <Text style={styles.createBtnText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.createBtn, { marginTop: 10, backgroundColor: "#f44336" }]}
                  onPress={() => {
                    setTasks(tasks.filter((t) => t !== selectedTask));
                    setShowTaskModal(false);
                  }}
                >
                  <Text style={styles.createBtnText}>Delete Task</Text>
                </TouchableOpacity>
              </>
            )}
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
    backgroundColor: '#5458caff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
  importanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  importanceBtn: {
    width: 90,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  importanceSelected: (level) => ({
    backgroundColor:
      level === "Low" ? "#4caf50" : level === "Medium" ? "#ff9800" : "#f44336",
  }),
  createBtn: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    backgroundColor: '#5458caff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
