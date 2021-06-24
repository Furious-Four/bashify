import styled from 'styled-components';
import {motion} from 'framer-motion';

export const LoginPage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  padding: 0 1.5rem;
  h1 {
    align-self: center;
    font-weight: 200;
  }
  button {
    margin: 1rem 0;
    width: 50%;
  }
`;

export const LoginForm = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 1.5rem;
  background: var(--white);
  color: var(--blue);
  width: calc(100% - 3rem);
  label.invalid {
    color: var(--red);
  }
  label:last-child {
    padding: 0;
  }
`;

export const LoginLabel = styled.label`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 0 0 1rem;
`;
