import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CurrentOrderPage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled(motion.button)`
   color: var(--blue);
   text-align: center;
   transition: all 0.15s;
  background: var(--orange);
  height: 25%;
  margin: 0.25rem;
`;

export const CurrentOrderHeader = styled(motion.div)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const CurrentOrderCard = styled(motion.div)`
  display: flex;
  flex-flow: column;
  align-items: center;
  background: var(--white);
  color: var(--blue);
  width: calc(100% - 2rem);
  margin: 1rem;
`;

export const CurrentOrderForm = styled(motion.div)`
  width: calc(100% - 2rem);
  display: flex;
  flex-flow: column nowrap;
  > div {
    width: 100%;
    padding-bottom: 1rem;
    :first-child {
      padding-top: 1rem;
    }
  }
`;

export const OrderRow = styled(motion.div)`
  display: flex;
  flex-flow: column nowrap;
  > div {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
`;
