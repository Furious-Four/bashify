import styled from 'styled-components';

export const CurrentOrderPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
 color: var(--blue);
 text-align: center;
 transition: all 0.15s;
 background: var(--orange);
`

export const CurrentOrderHeader = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const CurrentOrderCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background: var(--white);
  color: var(--blue);
  width: 75%;
  margin: 1rem;
`;

export const CurrentOrderForm = styled.div`
  display: flex;
  margin: 1rem;
  padding: 1rem;
  td {
     padding: .5rem;
  }
`;

