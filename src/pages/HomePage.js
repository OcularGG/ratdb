import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { Container, Button, Table, Form } from 'react-bootstrap';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState('WEST');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [view, searchTerm]);

  const fetchData = async () => {
    const table = view.toLowerCase() + '_server';
    let { data: ratdb, error } = await supabase
      .from(table)
      .select('*')
      .ilike('rat', `%${searchTerm}%`);
    if (error) console.log('Error fetching data:', error);
    else setData(ratdb);
  };

  return (
    <Container>
      <h1 className="my-4">Albion ratDB</h1>
      <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
            <tr key={item.rat_id}>
              <td>{item.rat_id}</td>
              <td>{item.rat}</td>
              <td>{view}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HomePage;