import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AllVenuesPage = styled(motion.div)`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

export const SingleVenue = styled(motion.a)`
  margin: 4rem;
  text-decoration: none;
  font-weight: 500;
`;
