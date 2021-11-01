import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import Slidebar from '../Components/Slidebar';

function Home() {
  return (
    <Grid fluid className="h-100">
      <Row>
        <Col xs={24} md={8}>
          <Slidebar></Slidebar>
        </Col>
      </Row>
    </Grid>
  );
}

export default Home;
