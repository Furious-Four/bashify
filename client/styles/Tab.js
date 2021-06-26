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

export const Link = styled.link`
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
  width: calc(100% - 2rem);
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
`;

export const CurrentTabCard = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  background: var(--white);
  color: var(--blue);
  width: calc(100% - 2rem);
  margin: 1rem;
`;

export const CurrentTabForm = styled.div`
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

export const TabRow = styled.div`
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

export const Subtotal = styled.h3`
  display: flex;
  flex-flow: row;
  align-items: center;
`;
