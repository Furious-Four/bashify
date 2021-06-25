import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

const GlobalStyle = createGlobalStyle`
  :root {
    --blue: #003049;
    --red: #d62828;
    --orange: #f77f00;
    --yellow: #fcbf49;
    --white: #eae2b7;
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--blue);
    color: var(--yellow);
    a {
      color: var(--white);
    }
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export const Button = styled(motion.button)`
  padding: 0.5rem;
  background: ${(props) =>
    props.secondary ? 'var(--white)' : 'var(--orange)'};
  border: 0;
  border-radius: 1rem;
  margin: 0.5rem;
  cursor: pointer;
`;

export default GlobalStyle;
