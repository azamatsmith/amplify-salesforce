/* src/App.js */
import Amplify from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from '../../graphql/mutations';
import { listTodos } from '../../graphql/queries';
import styled from 'styled-components';

const Error = styled.h2`
  color: red;
`;

const initialState = { name: '', description: '' };

const Todos = () => {
  const [token, setToken] = React.useState('');
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    Auth.currentSession()
      .then((session) => {
        console.log({ session });
        if (session) {
          setToken(session.idToken.jwtToken);
          setReady(true);
        } else {
          console.log('session not detected', { session });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (ready) {
      fetchTodos();
    }
    //fetchTodos();
  }, [ready]);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    setError('');
    Amplify.configure({
      aws_appsync_graphqlEndpoint:
        'https://hbln2g6gj5bqhczgczghxixj6u.appsync-api.us-west-2.amazonaws.com/graphql',
      aws_appsync_region: 'us-west-2',
      aws_appsync_authenticationType: 'OPENID_CONNECT',
      // aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    });
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log('error fetching todos', { err });
      setError(`Error: ${err}`);
    }
  }

  async function addTodo() {
    setError('');
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log('error creating todo:', err);
      setError(`Error: ${err}`);
    }
  }

  if (!ready) {
    return <div>loading</div>;
  }

  if (!token) {
    console.log('no token');
  }

  return (
    <div style={styles.container}>
      <Error>{error}</Error>
      <h2>Todos</h2>
      <input
        onChange={(event) => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>
        Create Todo
      </button>
      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: 'none',
    backgroundColor: '#ddd',
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px',
  },
};

export default Todos;
