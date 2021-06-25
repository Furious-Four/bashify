import styled from 'styled-components';

export const SplitPage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const SplitRow = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0 1rem 1rem;
  :last-child {
    padding-bottom: 0;
  }
`;

export const SplitTab = styled.div`
  width: calc(100% - 4rem);
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem;
  margin: 0 1rem;
  background-color: var(--white);
  color: var(--blue);
`;
export const SplitConfirm = styled.div`
  display: flex;
  font-weight: bold;
  padding: 1rem;
`;
