import styled from 'styled-components'
import AdditionalHeader from '../components/Home/AdditionalHeader';
import Layout from '../components/Layout'

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`;

const Home = () => (
  <Layout title="서울대학교 식단 알리미 : 식샤">
    <TopContainer>
      <AdditionalHeader />
      
    </TopContainer>
  </Layout>
)

export default Home
