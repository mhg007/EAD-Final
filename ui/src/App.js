import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import RecipeForm from "./components/YoutubeForm";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch("http://127.0.0.1:3001/recipe")
      .then((response) => {
        return response.json();
      })
      .then((data) => setProducts(data));
  };

  return (
    <div className="App">
      {products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
      {/* <RecipeForm /> */}
    </div>
  );
}

export default App;
