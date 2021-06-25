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

  .popup-box {
    position: fixed;
    background: #00000050;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
  }
   
  .box {
    position: relative;
    width: 50%;
    margin: 0 auto;
    height: auto;
    max-height: 80vh;
    margin-top: calc(100vh - 85vh - 20px);
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #999;
    overflow: auto;
  }

  .close-icon {
    content: 'x';
    cursor: pointer;
    position: fixed;
    right: calc(15% - 30px);
    top: calc(100vh - 85vh - 33px);
    background: #ededed;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    border: 1px solid #999;
    font-size: 20px;
  }
`;

export const Button = styled(motion.button)`
  padding: 0.5rem;
  background: var(--orange);
  border: 0;
  border-radius: 1rem;
  margin: 0.5rem;
  cursor: pointer;
`;

export default GlobalStyle;
