import styled from 'styled-components';

export const CurrentOrderPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
 display:inline-block;
 border:0.16em solid black;
 margin:0 0.3em 0.3em 0;
 box-sizing: border-box;
 text-decoration:none;
 font-weight:400;
 color: var(--blue);
 text-align:center;
 transition: all 0.15s;
 background: var(--orange)
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
  justify-content: right;
  margin: 1rem;
  padding: 1rem;
`;

