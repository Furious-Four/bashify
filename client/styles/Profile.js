import styled from 'styled-components';

export const ProfilePage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const ProfileTabs = styled.div`
  width: calc(100% - 2rem);
  background-color: var(--yellow);
  color: var(--blue);
  display: flex;
  flex-flow: row nowrap;
  > div {
    width: calc(
      (100% - ${(props) => (props.total - 1) * 2}px) / ${(props) => props.total}
    );
  }
`;

export const TabOption = styled.div`
  text-align: center;
  border-right: 2px solid var(--blue);
  padding: 1rem 0;
  ${(props) =>
    props.bold
      ? `
    background-color: var(--white);
    font-weight: bold;
  `
      : ''}
  :last-child {
    border: none;
  }
`;

export const DetailTab = styled.div`
  width: calc(100% - 2rem);
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem 0;
  margin: 0 1rem;
  background-color: var(--white);
  color: var(--blue);
`;

export const DetailRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 1rem;
  :last-child {
    padding-bottom: 0;
  }
  div:first-child {
    width: calc(40% - 1rem);
    text-align: right;
    padding-right: 1rem;
  }
  div:last-child {
    width: 60%;
  }
`;

export const FriendTab = styled.div`
  width: calc(100% - 4rem);
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem;
  margin: 0 1rem;
  background-color: var(--white);
  color: var(--blue);
`;

export const FriendSection = styled.div`
  width: calc(100%);
  display: flex;
  flex-flow: column nowrap;
  h3 {
    margin: 0;
    padding: 0;
  }
  :first-child {
    padding-bottom: 1rem;
  }
`;

export const RequestRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

export const FriendRequest = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const FriendRequestForm = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const TabTab = styled.div`
  width: calc(100% - 2rem);
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem 0;
  margin: 0 1rem;
  background-color: var(--white);
  color: var(--blue);
`;

export const TabCard = styled.div`
  display: flex;
  padding: 0 1rem 1rem;
  :last-child {
    padding-bottom: 0;
  }
`;
