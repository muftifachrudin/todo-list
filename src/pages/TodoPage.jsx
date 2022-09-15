import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import TodoItem from "../components/TodoItem";
import Axios from "axios";
import { connect } from 'react-redux';
import { 
  incrementTodoCount,
  decrementTodoCount,
  changeTodoCount,
  fetchTodoGlobal
} from '../redux/actions/todo'


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
        this.props.changeTodo(response.data.length)
      })
      .catch((err) => {
        alert("Error Update Data Server");
      });
  };

  deleteTodo = (id) => {
    Axios.delete(`http://localhost:2000/todoList/${id}`) // http://localhost:3000/todoList/2
      .then(() => {
        alert("Berhasil delete todo");
        this.props.fetchTodoGlobal();
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
        this.props.fetchTodoGlobal();
      })
      .catch((err) => {
        alert("Error completeTodo Server");
      });
  };

  renderTodoList = () => {
    return this.props.todoGlobalState.todoList.map((val) => {
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
        this.props.fetchTodoGlobal();
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
    this.props.fetchTodoGlobal();
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
          Get my todo list {this.props.todoGlobalState.todoCount}
        </button>
        {this.renderTodoList()}
        <div>
          <input onChange={this.inputHandler} type="text" className="mx-3" />
          <button onClick={this.addTodo} className="btn btn-primary">
            Add Todo
          </button>
          <button onClick={this.props.incrementTodo} className="btn btn-warning">Increment TODO</button>
          <button onClick={this.props.decrementTodo} className="btn btn-info">Decrement TODO</button>
          <button onClick={() => this.props.changeTodo(7)} className="btn btn-dark">Change TODO</button>
        </div>
      </div>
    );
  }
}

const mapStateProps = (state) => {
  // state.todo.inputTodo
  return {
    todoGlobalState: state.todo,
  }
}

const mapDispatchToProps = {
  incrementTodo: incrementTodoCount,
  decrementTodo: decrementTodoCount,
  changeTodo: changeTodoCount,
  fetchTodoGlobal
}

export default connect(mapStateProps, mapDispatchToProps)(TodoPage);