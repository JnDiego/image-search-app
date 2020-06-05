import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ImageList from './components/ImageList';

function App() {
  //State de la app
  const [search, setSearch] = useState('');
  //State de imagenes desde la API
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (search === '') return;
    const fetchAPI = async () => {
      const imagesByPage = 30;
      const API_KEY = '16893078-7fef388e44f1894ea56a268bb';
      const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${search}&per_page=${imagesByPage}`;

      const response = await fetch(URL);
      const result = await response.json();

      setImages(result.hits);
    };
    fetchAPI();
  }, [search]);
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image Search</p>
        <Form setSearch={setSearch} />
      </div>
      <div className="row justify-content-center">
        <ImageList images={images} />
      </div>
    </div>
  );
}

export default App;
