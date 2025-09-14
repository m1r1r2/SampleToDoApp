/* 
   This component is used to show, update, and delete TODOs.
   - It uses Context API (useTodos) to access "updateTodo" and "deleteTodo" functions. 
   - A FlatList displays all the todos.
   - A Modal is used to edit a selected todo.
   - Each todo also has a delete button to remove it.
*/

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTodos } from "../context/ToContextApi";

export default function ShowToDoItem() {
  const { todos, updateTodo, deleteTodo } = useTodos();
  const [modalVisible, setModalVisible] = useState(false);
  const [editTask, setEditTask] = useState("");
  const [editId, setEditId] = useState(null);

  const openEditModal = (item) => {
    setEditTask(item.title);
    setEditId(item.id);
    setModalVisible(true);
  };

  const saveEdit = async () => {
    if (editTask.trim() === "") return;
    await updateTodo(editId, editTask);
    setModalVisible(false);
    setEditId(null);
    setEditTask("");
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.todoText}
            >
              {item.title}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => openEditModal(item)} >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTodo(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal for Editing the Todos*/}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              value={editTask}
              onChangeText={setEditTask}
              style={styles.modalInput}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 10, alignItems: "center" }}
            >
              <Text style={{ color: "red", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

//  Styles of the component
const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    padding: 10,
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "stretch",
  },
  todoText: {
    fontSize: 14,
    margin: 8,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
