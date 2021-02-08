import styled from 'styled-components'
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';

const MainBlock = styled.div`
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;

  .mobile-waffle-logo {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;

    .mobile-waffle-logo {
      display: block;
      width: 50%;
      opacity: 0.8;
      margin: 20px 0px;
      object-fit: contain;
    }
  }
`;

const Main = () => {
  return (
    <MainBlock>
      <MainContainer />
      <img className="mobile-waffle-logo" src="/img/waffle-logo.png"></img>
    </MainBlock>
  );
};

export default Main;