import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ImageList from './components/ImageList';

function App() {
  //State de la app
  const [search, setSearch] = useState('');
  //State de imagenes desde la API
  const [images, setImages] = useState([]);
  // State de página actual
  const [actualpage, setActualPage] = useState(1);
  // State de total paginas
  const [totalpages, setTotalPages] = useState(1);

  useEffect(() => {
    if (search === '') return;
    const fetchAPI = async () => {
      const imagesByPage = 30;
      const API_KEY = '';
      const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${search}&per_page=${imagesByPage}&page=${actualpage}`;

      const response = await fetch(URL);
      const result = await response.json();

      setImages(result.hits);
      // Calcular el total de paginas
      const calculateTotalPages = Math.ceil(result.totalHits / imagesByPage);
      setTotalPages(calculateTotalPages);

      // Mover pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    };
    fetchAPI();
  }, [actualpage, search]);

  // Definir página anterior
  const previousPage = () => {
    const newActualPage = actualpage - 1;
    if (newActualPage === 0) return;
    setActualPage(newActualPage);
  };
  // Definir página siguiente
  const nextPage = () => {
    const newActualPage = actualpage + 1;
    if (newActualPage > totalpages) return;
    setActualPage(newActualPage);
  };
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image Search</p>
        <Form setSearch={setSearch} />
      </div>
      <div className="row justify-content-center">
        <ImageList images={images} />
        {actualpage === 1 ? null : (
          <button type="button" className="btn btn-info mr-1" onClick={previousPage}>
            &laquo; Previous page
          </button>
        )}
        {actualpage === totalpages ? null : (
          <button type="button" className="btn btn-info" onClick={nextPage}>
            Next page &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
