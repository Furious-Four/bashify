import styled from 'styled-components';

export const RegisterPage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const RegisterForm = styled.div`
  display: flex;
  flex-flow: column nowrap;
  button {
    margin: 0.5rem;
  }
  label.invalid {
    color: red;
  }
`;

export const RegisterLabel = styled.label`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  input {
    margin-left: 0.5rem;
  }
`;
