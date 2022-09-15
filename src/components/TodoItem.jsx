import React from "react";

class TodoItem extends React.Component {
  deleteBtnHandler() {
    alert("Anda Memencet button Delete");
  }

  btnHandler() {
    alert(`Anda telah menyelesaikan Activity`);
  }

  // componentWillUnmount() {
  //   alert("Component Unmount");
  // }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-item-center">
        {this.props.todoData.activity} id: {this.props.todoData.id} status:{" "}
        {this.props.todoData.status}
        <div>
          <button
            onClick={() => this.props.deleteTodoHandler(this.props.todoData.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
          <button
            disabled={this.props.todoData.isFinished}
            onClick={() =>
              this.props.completeTodoHandler(this.props.todoData.id)
            }
            className="btn btn-success"
          >
            {
              //if ternary
              //this.props.todoData.isFinished ? <strong>Finished</strong> : <em>Complete</em>
              this.props.todoData.isFinished ? "Finished" : "Complete"
            }
          </button>
        </div>
      </div>
    );
  }
}

export default TodoItem;