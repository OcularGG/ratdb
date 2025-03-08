import React from 'react';
import { Container } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container>
      <h2 className="my-4">About ratDB</h2>
      <p>
        ratDB is a community-driven database for tracking player behavior in Albion Online.
        Our goal is to help maintain a healthy gaming environment by providing transparency
        and accountability.
      </p>
      <h3>How it Works</h3>
      <p>
        Players can search for information across different servers (WEST, EAST, and EUROPE)
        to make informed decisions about their interactions with other players.
      </p>
      <h3>Contributing</h3>
      <p>
        This project is open source and we welcome contributions from the community.
        Please visit our GitHub repository to learn more about how you can contribute.
      </p>
    </Container>
  );
};

export default AboutPage;