import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { Container, Button, Table, Form } from 'react-bootstrap';
import Loading from '../components/Loading';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState('WEST');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [view, searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    const table = view.toLowerCase() + '_server';
    let { data: ratdb, error } = await supabase
      .from(table)
      .select('*')
      .ilike('rat', `%${searchTerm}%`);
    
    if (error) console.log('Error fetching data:', error);
    else setData(ratdb);
    
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <h1 className="my-4">Albion ratDB</h1>
      <Form.Control 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="mb-3"
      />
      <div className="mb-3">
        <Button variant={view === 'WEST' ? 'primary' : 'outline-primary'} onClick={() => setView('WEST')}>WEST</Button>
        <Button variant={view === 'EAST' ? 'primary' : 'outline-primary'} onClick={() => setView('EAST')}>EAST</Button>
        <Button variant={view === 'EUROPE' ? 'primary' : 'outline-primary'} onClick={() => setView('EUROPE')}>EUROPE</Button>
      </div>
      <div className="table-responsive">
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
      </div>
    </Container>
  );
};

export default HomePage;