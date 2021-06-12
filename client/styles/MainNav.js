import styled from 'styled-components';

export const MainNavDiv = styled.div`
  a {
    color: var(--white);
    text-decoration: none;
  }
`;

export const NavTopbar = styled.div`
  > div {
    display: flex;
    justify-content: space-between;
    background: var(--red);
    padding: 1rem;
  }
`;

export const NavSlideout = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background: var(--yellow);
  height: calc(100vh - 2rem);
  width: 77%;
  padding: 1rem;
  color: var(--blue);
`;

export const SlideoutOptions = styled.div`
  display: flex;
  flex-flow: column nowrap;
  a {
    margin: 0.5rem 0;
  }
`;

export const SlideoutOpt = styled.div`
  padding: 0.5rem;
  background-color: ${(props) => (props.current ? 'var(--white)' : 'inherit')};
  border: ${(props) => (props.current ? 'solid 2px var(--blue)' : 'none')};
`;
