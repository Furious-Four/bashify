import styled from 'styled-components';

import { motion } from 'framer-motion';

export const AllDrinksPage = styled(motion.div)`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const SingleDrinkParent = styled(motion.div)`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 4rem;
  text-decoration: none;
  font-weight: 500;
`;

export const SingleDrink = styled(motion.a)`
  margin: 4rem;
  text-decoration: none;
  font-weight: 500;
`;

export const Image = styled.img`
  height: 300px;
  width: 200px;
`;
