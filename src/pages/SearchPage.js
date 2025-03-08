import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import supabase from '../supabaseClient';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .rpc('search_all_servers', { search_term: searchQuery });
    
    if (error) console.error('Error:', error);
    else setResults(data);
  };

  return (
    <Container>
      <h2 className="my-4">Advanced Search</h2>
      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3">
          <Form.Label>Search across all servers</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter player name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      
      {results.length > 0 && (
        <div className="mt-4">
          <h3>Results</h3>
          {results.map((result, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{result.rat}</h5>
                <p className="card-text">Server: {result.server}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default SearchPage;