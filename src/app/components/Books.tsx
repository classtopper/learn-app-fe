// src/app/components/Books.tsx
// src/app/components/Books.tsx

"use client";

import React, { useState } from "react";
import "./Books.css";

interface Book {
  id: number;
  title: string;
  category: string;
  cover?: string; // Optional cover image URL
  read: string;
  download: string;
}

const booksData: Book[] = [
  {
    id: 301,
    title: "German Grammar Drills",
    category: "Language",
    cover: "https://archive.org/services/img/german-grammar-drills",
    read: "https://archive.org/stream/german-grammar-drills/german-grammar-drills.pdf",
    download: "https://archive.org/stream/german-grammar-drills/german-grammar-drills.pdf",
  },
  {
    id: 302,
    title: "Essential German Grammar",
    category: "Language",
    cover: "https://archive.org/services/img/EssentialGermanGrammar",
    read: "https://archive.org/stream/EssentialGermanGrammar/EssentialGermanGrammar.pdf",
    download: "https://archive.org/stream/EssentialGermanGrammar/EssentialGermanGrammar.pdf",
  },
  {
    id: 303,
    title: "A Practical German Grammar",
    category: "Language",
    cover: "https://archive.org/services/img/thomas-a-practical-german-grammar",
    read: "https://archive.org/stream/thomas-a-practical-german-grammar/thomas-a-practical-german-grammar.pdf",
    download: "https://archive.org/stream/thomas-a-practical-german-grammar/thomas-a-practical-german-grammar.pdf",
  },
  {
    id: 304,
    title: "A Practical German Review Grammar",
    category: "Language",
    cover: "https://archive.org/services/img/practicalgermanr00coch_0",
    read: "https://archive.org/stream/practicalgermanr00coch_0/practicalgermanr00coch_0.pdf",
    download: "https://archive.org/stream/practicalgermanr00coch_0/practicalgermanr00coch_0.pdf",
  },
  {
    id: 305,
    title: "Complete German Grammar",
    category: "Language",
    cover: "https://archive.org/services/img/complete-german-grammar-pdfdrive",
    read: "https://archive.org/stream/complete-german-grammar-pdfdrive/complete-german-grammar-pdfdrive.pdf",
    download: "https://archive.org/stream/complete-german-grammar-pdfdrive/complete-german-grammar-pdfdrive.pdf",
  },
  {
    id: 306,
    title: "Deep Learning",
    category: "Tech",
    cover: "https://www.deeplearningbook.org/img/dlbook_logo.png",
    read: "https://www.deeplearningbook.org/",
    download: "https://www.deeplearningbook.org/contents.pdf",
  },
  {
    id: 307,
    title: "Machine Learning Yearning",
    category: "Tech",
    cover: "https://machinelearningyearning.com/img/cover.png",
    read: "https://storage.googleapis.com/mlyearning/mlyearning_en.pdf",
    download: "https://storage.googleapis.com/mlyearning/mlyearning_en.pdf",
  },
  {
    id: 308,
    title: "Pattern Recognition and Machine Learning",
    category: "Tech",
    cover: "https://images-na.ssl-images-amazon.com/images/I/41KQntfJPvL._SX379_BO1,204,203,200_.jpg",
    read: "https://www.microsoft.com/en-us/research/wp-content/uploads/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
    download: "https://www.microsoft.com/en-us/research/wp-content/uploads/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
  },
  {
    id: 309,
    title: "Machine Learning and Deep Learning with Python, scikit‑learn, and TensorFlow 2",
    category: "Tech",
    cover: "https://archive.org/services/img/python-machine-learning-and-deep-learning-with-python-scikit-learn-and-tensorflow-2",
    read: "https://archive.org/download/python-machine-learning-and-deep-learning-with-python-scikit-learn-and-tensorflow-2/python-machine-learning-and-deep-learning-with-python-scikit-learn-and-tensorflow-2.pdf",
    download: "https://archive.org/download/python-machine-learning-and-deep-learning-with-python-scikit-learn-and-tensorflow-2/python-machine-learning-and-deep-learning-with-python-scikit-learn-and-tensorflow-2.pdf",
  },
  {
    id: 310,
    title: "Deep Learning (Goodfellow, Bengio & Courville)",
    category: "Tech",
    cover: "https://archive.org/services/img/deeplearning0000good",
    read: "https://archive.org/download/deeplearning0000good/deeplearning0000good.pdf",
    download: "https://archive.org/download/deeplearning0000good/deeplearning0000good.pdf",
  },
  
];

const ITEMS_PER_PAGE = 10;

const BooksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", "Tech", "Inspiring", "Fiction", "Language"];

  const filteredBooks = booksData.filter((book) => {
    const matchesCategory = categoryFilter === "All" || book.category === categoryFilter;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const booksToShow = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="books-container">
      <h1>Discover Your Next Read</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by book title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="category-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <table className="books-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Category</th>
            <th>Read</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {booksToShow.map((book) => (
            <tr key={book.id}>
              <td className="cover-cell">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={`${book.title} cover`}
                    className="book-cover"
                  />
                ) : (
                  <span className="book-title-only">{book.title}</span>
                )}
              </td>
              <td>{book.title}</td>
              <td>{book.category}</td>
              <td>
                <a
                  href={book.read}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-btn"
                >
                  Read
                </a>
              </td>
              <td>
                <a
                  href={book.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksPage;
