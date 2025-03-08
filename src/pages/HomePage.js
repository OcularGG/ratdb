import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Table, Form } from 'react-bootstrap';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState('WEST');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`/api/data?view=${view}`).then(response => {
      setData(response.data);
    });
  }, [view]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    axios.get(`/api/data?view=${view}&search=${e.target.value}`).then(response => {
      setData(response.data);
    });
  };

  return (
    <Container>
      <h1 className="my-4">Albion ratDB</h1>
      <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      <div className="my-3">
        <Button onClick={() => setView('WEST')}>WEST</Button>
        <Button onClick={() => setView('EAST')}>EAST</Button>
        <Button onClick={() => setView('EUROPE')}>EUROPE</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Server</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.server}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HomePage;