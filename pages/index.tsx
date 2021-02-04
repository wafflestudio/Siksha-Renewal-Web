import styled from 'styled-components'
import { AdditionalHeader, FixedHeader, Main } from '../components/Home'
import ContextProvider from '../utils/hooks/ContextProvider'
import Layout from '../components/Common/Layout'

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`;

const Home = () => (
  <Layout title="서울대학교 식단 알리미 : 식샤">
    <ContextProvider>
      <TopContainer>
        <AdditionalHeader />
        <FixedHeader />
        <Main />
      </TopContainer>
    </ContextProvider>
  </Layout>
)

export default Home