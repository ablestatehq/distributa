import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function HowTo() {
    return <Container>
        <p>This Free app will save your time. Determines how much each team member will get from a shareable amount.</p>
        <p><b>3 Simple steps.</b></p>
        <Row className="justify-content-between">
            <Col className="col-md-3 p-4 bg-light border border-light">
                <h4>1</h4>
                <p>Enter the amount you want to share.</p>
            </Col>
            <Col className="bg-light p-4 col-md-3 border border-light">
                <h4>2</h4>
                <p>Enter the Name and Percentage of each person. Made a mistake? No worries you can edit or delete.</p>
            </Col>
            <Col className="bg-light p-4 col-md-3 border border-light">
                <h4>3</h4>
                <p>See the breakdown of the amount. Click Reset to start a fresh.</p>
            </Col>
        </Row>
  </Container>;
}

export default HowTo;
