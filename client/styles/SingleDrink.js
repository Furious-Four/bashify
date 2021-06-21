import styled from 'styled-components';

import { motion } from 'framer-motion';

export const SingleDrinkPage = styled(motion.div)`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const SingleDrinkView = styled(motion.div)`
  margin: 4rem;
  text-decoration: none;
  font-weight: 500;
`;
