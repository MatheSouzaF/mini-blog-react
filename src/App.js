import "./App.css";
import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId =
      items.length > 0 ? Math.max(...items.map((p) => parseInt(p.id))) + 1 : 1;

    const product = {
      id: newId.toString(),
      name,
      price,
    };

    httpConfig(product, "POST");
    setName("");
    setPrice("");
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>

      {/* 6 - loading */}
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <ul>
          {items.map((product) => (
            <li key={product.id}>
              <h2>
                {product.name} - <span>{product.id}</span>
              </h2>
              <p>Preço: R$ {product.price}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="add-product">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="preco"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/* 7 - state de loading no post */}

          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
