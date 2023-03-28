import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  gql,
} from "@apollo/client";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const HELLO_QUERY = gql`
  query Hello($message: String!) {
    hello(message: $message)
  }
`;

const CALCULATOR_QUERY = gql`
  query Calculator($value1: Int!, $value2: Int!) {
    calculator(value1: $value1, value2: $value2)
  }
`;
const LONGNAME_QUERY = gql`
query LongName($delivery: String!) {
  longName(delivery: $delivery)
  }
`;

function Hello() {
  const [message, setMessage] = useState("");
  const [getGreeting, { loading, error, data }] = useLazyQuery(HELLO_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGreeting({ variables: { message } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className="mt-3">{data.hello}</h2>}
    </div>
  );
}

function Calculator() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [getGreeting, { loading, error, data }] = useLazyQuery(
    CALCULATOR_QUERY
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value1 === "") {
      setValue1(0);
    }
    if (value2 === "") {
      setValue2(0);
    }
    console.log({ value1, value2 });

    getGreeting({ variables: { value1, value2 } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Santiago Sánchez (HU-SA-0001)</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCalculator">
          <Form.Control
            type="number"
            value={value1}
            onChange={(e) => setValue1(parseInt(e.target.value))}
            placeholder="Escribe tu primer número"
          />
          <Form.Control
            type="number"
            value={value2}
            onChange={(e) => setValue2(parseInt(e.target.value))}
            placeholder="Escribe tu segundo número"
          />
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className="mt-3">{data.calculator}</h2>}
    </div>
  );
}


function  LongName() {
  const [delivery, setMessage] = useState("");
  const [getGreeting, { loading, error, data }] = useLazyQuery(LONGNAME_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGreeting({ variables: { delivery } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2> Victor Alomia (HU-VA-0003)</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formLongName">
          <Form.Control
            type="text"
            value={delivery}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className="mt-3">{data.longName}</h2>}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className="my-5">
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <h1>Aplicación React y GraphQL</h1>
            <Hello />
            <br />
            <Calculator />
             <br />
             < LongName/> 
            <br/>
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}

export default App;
