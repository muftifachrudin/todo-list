import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import TodoPage from "./pages/TodoPage";
import Navbar from "./components/Navbar"

const App = () => {
    return (
      <div>
        <Navbar />
        <TodoPage />
      </div>
    )
}

export default App;