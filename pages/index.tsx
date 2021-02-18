import styled from 'styled-components'
import { GetServerSideProps, NextPage } from 'next'
import Layout from '../Common/Layout'
import { AdditionalHeader, FixedHeader, SidebarContainer, MainContainer } from '../Home'
import ContextProvider from '../utils/hooks/ContextProvider'
import { Data } from '../interfaces'
import { formatISODate } from '../utils/hooks/FormatUtil'

const TopContainer = styled.div`
  text-align: center;
`;

type Props = {
  data: Data
}

export const getServerSideProps: GetServerSideProps = async () => {
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 31)

  const res = await fetch(`https://siksha-api.wafflestudio.com/menus?start_date=2021-02-02&end_date=${formatISODate(endDate)}&except_empty=true`)
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

const Home: NextPage<Props> = ({ data }) => {
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