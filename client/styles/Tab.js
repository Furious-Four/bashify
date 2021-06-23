import styled from 'styled-components';

export const CurrentTabPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
   color: var(--blue);
   text-align: center;
   transition: all 0.15s;
  background: var(--orange);
  height: 25%;
  margin: 0.25rem;
`;

export const CurrentTabHeader = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const Tip = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
`;

export const CurrentTabCard = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  background: var(--white);
  color: var(--blue);
  width: 75%;
  margin: 1rem;
`;

export const CurrentTabForm = styled.div`
  display: flex;
  .formDiv {
    display: flex;
    align-items: center;
  }
  div {
    padding: 1rem;
  }
`;
export const Subtotal = styled.h3`
  display: flex;
  flex-flow: row;
  align-items: center;
`;
