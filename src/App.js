import TodoContextProvider from "./contexts/TodoContext";

const { default: Header } = require("./components/Header");
const { default: TodoList } = require("./components/TodoList/TodoList");

function App() {
  return (
    <div className="App container">
      <TodoContextProvider>
        <Header />
        <TodoList />
      </TodoContextProvider>
    </div>
  );
}

export default App;
