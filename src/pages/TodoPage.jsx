import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import TodoItem from "../components/TodoItem";
import Axios from "axios";

//Props
// Data dari Parents ke Child

//State
// Data di component itu sendiri / kondisi dari komponen (apakah ada data/boleh diload / error?)
// Variabel biasa yang menampung banyak data
class TodoPage extends React.Component {
  state = {
    todoList: [],
    inputTodo: "",
  };

  fetchTodo = () => {
    Axios.get("http://localhost:2000/todoList") // start execute
      .then((response) => {
        console.log(response.data);
        this.setState({ todoList: response.data });
      })
      .catch((err) => {
        alert("Error Update Data Server");
      });
  };

  deleteTodo = (id) => {
    Axios.delete(`http://localhost:2000/todoList/${id}`) // http://localhost:3000/todoList/2
      .then(() => {
        alert("Berhasil delete todo");
        this.fetchTodo();
      })
      .catch((err) => {
        alert("Error Delete Data Server");
      });
  };

  completeTodo = (id) => {
    Axios.patch(`http://localhost:2000/todoList/${id}`, {
      isFinished: true,
    })
      .then(() => {
        alert("Berhasil dikerjakan");
        this.fetchTodo();
      })
      .catch((err) => {
        alert("Error completeTodo Server");
      });
  };

  renderTodoList = () => {
    return this.state.todoList.map((val) => {
      return (
        <TodoItem
          completeTodoHandler={this.completeTodo}
          deleteTodoHandler={this.deleteTodo}
          todoData={val}
        />
      );
    });
  };

  addTodo = () => {
    Axios.post("http://localhost:2000/todoList", {
      activity: this.state.inputTodo,
      isFinished: false,
    })
      .then(() => {
        alert("Berhasil Ditambahkan");
        this.fetchTodo();
      })
      .catch((err) => {
        alert("Error Menambah Server");
      });
  };

  inputHandler = (event) => {
    this.setState({ inputTodo: event.target.value });
  };

  btnHandler = (event2) => {
    this.setState({ buttonTodo: event2.target.value });
  };

  componentDidMount() {
    this.fetchTodo();
  }

  // componentDidUpdate() {
  //   alert("component update");
  // }

  render() {
    // alert("Component Render");
    return (
      <div>
        <h1>Todo List</h1>
        <button className="btn btn-info" onClick={this.fetchTodo}>
          Get my todo list
        </button>
        {this.renderTodoList()}
        <div>
          <input onChange={this.inputHandler} type="text" className="mx-3" />
          <button onClick={this.addTodo} className="btn btn-primary">
            Add Todo
          </button>
        </div>
      </div>
    );
  }
}

export default TodoPage;