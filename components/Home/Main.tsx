import styled from 'styled-components'
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';

const MainBlock = styled.div`
  
`;

const Main = () => {
  return (
    <MainBlock>
      <SidebarContainer />
      <MainContainer />
    </MainBlock>
  );
};

export default Main;