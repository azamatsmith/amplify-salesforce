import React from 'react';
// import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
`;

const Button = styled.button`
  border-radius: 4px;
  margin: 10px 0;
  padding: 10px;
`;

function Form() {
  const { register, handleSubmit, errors } = useForm();

  function onSubmit(data) {
    console.log({ data });
  }

  console.log({ errors });

  return (
    <div className="Form">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="username"
          ref={register({ required: 'Username required' })}
        />
        {errors.username && errors.username.message}
        <Input
          name="password"
          ref={register({
            required: 'Password required',
            minLength: { value: 4, message: 'Too short dude' },
          })}
        />
        {errors.password && errors.password.message}
        <Button type="submit">Submit</Button>
      </StyledForm>
    </div>
  );
}

Form.propTypes = {};

Form.defaultProps = {};

export default Form;
