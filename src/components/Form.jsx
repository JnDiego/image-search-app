import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ({ setSearch }) => {
  const [word, setWord] = useState('');
  const [error, setError] = useState(false);
  const searchImages = (event) => {
    event.preventDefault();

    // Validar campo

    if (word.trim() === '') {
      setError(true);
      return;
    }

    setError(false);
    // Enviar término de busqueda a componente principal
    setSearch(word);
  };
  return (
    <form action="" onSubmit={searchImages}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search a image..."
            onChange={(event) => setWord(event.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input type="submit" className="btn btn-lg btn-danger btn-block" value="Search" />
        </div>
      </div>
      {error ? <Error message="Add a search word" /> : null}
    </form>
  );
};

Form.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default Form;
