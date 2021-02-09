import styled from 'styled-components'
import Layout from '../components/Common/Layout'
import { AdditionalHeader, FixedHeader, SidebarContainer, MainContainer } from '../components/Home'
import ContextProvider from '../utils/hooks/ContextProvider'

const TopContainer = styled.div`
  text-align: center;

  .mobile-waffle-logo {
    display: none;
  }

  @media (max-width: 768px) {
    .mobile-waffle-logo {
      display: inline-block;
      width: 50%;
      opacity: 0.8;
      margin: 20px 0px;
      object-fit: contain;
    }
  }
`;

const Home = () => (
  <Layout title="서울대학교 식단 알리미 : 식샤">
    <ContextProvider>
      <TopContainer>
        <AdditionalHeader />
        <FixedHeader />
        <SidebarContainer />
        <MainContainer />
      </TopContainer>
    </ContextProvider>
  </Layout>
)

export default Home