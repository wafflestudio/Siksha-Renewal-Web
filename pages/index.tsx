import styled from 'styled-components'
import { GetServerSideProps, NextPage } from 'next'
import Layout from '../components/Common/Layout'
import { AdditionalHeader, FixedHeader, SidebarContainer, MainContainer } from '../components/Home'
import ContextProvider from '../utils/hooks/ContextProvider'
import { Data } from '../interfaces'

const TopContainer = styled.div`
  text-align: center;
`;

type Props = {
  data: Data
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://siksha-api.wafflestudio.com/menus?start_date=2021-01-31&end_date=2021-02-15&except_empty=true')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

const Home: NextPage<Props> = ({ data }) => {

  console.log(data)

  return (
    <Layout title="서울대학교 식단 알리미 : 식샤">
      <ContextProvider>
        <TopContainer>
          <AdditionalHeader />
          <FixedHeader />
          <SidebarContainer data={data} />
          <MainContainer data={data} />
        </TopContainer>
      </ContextProvider>
    </Layout>
  )
}

export default Home