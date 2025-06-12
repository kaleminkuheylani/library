import { useEffect, useState } from "react";

export const Todos = () => {
  const [book, setBook] = useState({ purchased: false, author: "", name: "" });
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
      setBooks(storedBooks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleAddTodo = () => {
    const newBook = {
      author: book.author,
      name: book.name,
      purchased: book.purchased === "true" || book.purchased === true,
    };
    if (book.author && book.name) {
      setBooks([...books, newBook]);
      setBook({ name: "", author: "", purchased: false }); // input'ları temizle
    } else {
      alert("Lütfen kitap adı ve yazar bilgilerini doldurun.");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === "purchased" ? value === "true" : value,
    }));
  };

  const handleRemoveTodo = (id) => {
    const updatedBooks = books.filter((_, i) => i !== id);
    setBooks(updatedBooks);
  };

  return (
    <div className="App">
      <h1>TODO App</h1>
      <header className="App-header">
        <input
          type="text"
          placeholder="add book"
          value={book.name}
          onChange={onChangeHandler}
          name="name"
        />
        <select name="purchased" value={book.purchased} onChange={onChangeHandler}>
          <option value={false}>Satın Alınmadı</option>
          <option value={true}>Satın Alındı</option>
        </select>
        <input
          type="text"
          placeholder="author"
          value={book.author}
          onChange={onChangeHandler}
          name="author"
        />
        <button onClick={handleAddTodo}>Add</button>

        <ul className="book-list">
          {books.map((b, index) => (
            <li key={index}>
              <strong>{b.name}</strong> - {b.author} (
              {b.purchased ? "Satın Alındı" : "Satın Alınmadı"})
              <button onClick={() => handleRemoveTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};