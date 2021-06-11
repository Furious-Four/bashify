import styled from 'styled-components';

export const LoginPage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const LoginForm = styled.div`
  display: flex;
  flex-flow: column nowrap;
  button {
    margin: 0.5rem;
  }
`;

export const LoginLabel = styled.label`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  input {
    margin-left: 0.5rem;
  }
`;
