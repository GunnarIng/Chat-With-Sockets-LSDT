import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import purple from '../assets/purple.png';

interface Message {
  username: string;
  message: string;
}

function Chat() {
  const location = useLocation();
  const { username } = location.state;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatText.trim() !== '') {
      setMessages([...messages, { username, message: chatText }]);
      setChatText('');
    }
  };

  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.target.value);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        maxHeight: '100vh',
        border: '2px solid black',
        backgroundImage: `url(${purple})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: "100%",
        overflow: "hidden",
        // margin: '1rem',
        padding: '1rem',
      }}
    >
      <Container fluid style={{ minHeight: '98vh', display: 'flex', flexDirection: 'column' }}>
        <Row style={{ flexGrow: 1, marginBottom: '1rem', overflowY: 'auto' }}>
          <Col>
            <ListGroup style={{ maxHeight: '80vh', overflowY: 'auto'}}>
              {messages.map((msg, index) => (
                <ListGroup.Item key={index} className="message-item">
                  <strong>{msg.username}: </strong>
                  <p style={{ display: 'inline' }}>{msg.message}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row className="d-flex align-items-end">
          <Col>
            <Form onSubmit={handleSubmit}>
              <InputGroup style={{ display: "flex", gap: "1rem", marginTop: 'auto'}}>
                <Form.Control
                  type='text'
                  value={chatText}
                  onChange={handleChange}
                  placeholder='Type your message here...'
                />
                  <Button type='submit' disabled={chatText.trim() === ''}>
                    Send
                  </Button>
                <InputGroup>
                </InputGroup>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chat;
