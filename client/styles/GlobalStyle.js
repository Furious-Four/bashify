import { createGlobalStyle } from 'styled-components';

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
    color: var(--white);
  }
`;

export default GlobalStyle;
