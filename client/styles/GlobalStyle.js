import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --blue: #003049;
    --red: #d62828;
    --orange: #f77f00;
    --yellow: #fcbf49;
    --white: #eae2b7;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
    margin: 0;
    padding: 0;
    background: var(--blue);
    color: var(--yellow);
    a {
      color: var(--orange);
    }
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export const Button = styled.button`
  padding: 0.5rem;
  background: var(--orange);
  border: 0;
  border-radius: 0.1rem;
`;

export default GlobalStyle;
