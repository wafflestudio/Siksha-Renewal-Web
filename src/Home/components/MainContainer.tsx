import styled from 'styled-components'
import MenuCard from './MenuCard'
import { Day, Restaurant } from '../../interfaces'
import { useStateContext } from '../../utils/ContextProvider'
import { useMemo } from 'react'

const MainContainerBlock = styled.div`
  display: inline-block;
  padding-bottom: 10px;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;

  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 768px) {
    width: 100vw;
  }
`

const TextContainer = styled.p`
  font-size: 10.5pt;
  font-family: 'NanumBarunGothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;

  animation: slidein .75s;
  -moz-animation: slidein .75s; /* Firefox */
  -webkit-animation: slidein .75s; /* Safari and Chrome */
  -o-animation: slidein .75s; /* Opera */

  @keyframes slidein {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-moz-keyframes slidein { /* Firefox */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-webkit-keyframes slidein { /* Safari and Chrome */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-o-keyframes slidein { /* Opera */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const MenuCardContainer = styled.div`
  width: 100%;
  max-width: 800px;

  animation: slidein .75s;
  -moz-animation: slidein .75s; /* Firefox */
  -webkit-animation: slidein .75s; /* Safari and Chrome */
  -o-animation: slidein .75s; /* Opera */
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.img`
  display: none;

  animation: logoin .75s;
  -moz-animation: logoin .75s; /* Firefox */
  -webkit-animation: logoin .75s; /* Safari and Chrome */
  -o-animation: logoin .75s; /* Opera */

  @keyframes logoin {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
  @-moz-keyframes logoin { /* Firefox */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
  @-webkit-keyframes logoin { /* Safari and Chrome */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
  @-o-keyframes logoin { /* Opera */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 0.8;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    display: inline-block;
    opacity: 0.8;
    margin: 20px 0 5px 0;
    width: 20rem;
  }
`

const DownloadPanel = styled.div`
  margin-bottom: 20px;
  padding: 0;
  opacity: 0.8;
  display: none;

  animation: logoin .75s;
  -moz-animation: logoin .75s; /* Firefox */
  -webkit-animation: logoin .75s; /* Safari and Chrome */
  -o-animation: logoin .75s; /* Opera */

  @media (max-width: 768px) {
    display: inline-block;
  }
`

const Download = styled.img`
  width: 8rem;
  margin: 0 2px;
`

const MainContainer: React.FC<{ loading: boolean }> = ({ loading }) => {
  const state = useStateContext()
  const { date, meal, data } = state

  const menus: Day[] = useMemo(() => data ? data.result : [], [data])

  const dateIndex = useMemo(() => menus.findIndex(day => new Date(day.date).toDateString() === date.toDateString()), [menus, date])

  return (
    <MainContainerBlock>
      {loading && <TextContainer key={'loading'+meal+date}>메뉴를 불러오는 중입니다.</TextContainer>}
      {menus[dateIndex] && (menus[dateIndex][meal].length === 0 && <TextContainer key={'text'+meal+date}>업로드 된 식단이 없습니다.</TextContainer>)}
      <MenuContainer>
        {(menus[dateIndex] && menus[dateIndex][meal]) && menus[dateIndex][meal].map((restaurant: Restaurant) => (
          <MenuCardContainer key={restaurant.id+meal+date}>
            <MenuCard restaurant={restaurant} />
          </MenuCardContainer>
        ))}
      </MenuContainer>
      <Footer key={'footer'+meal+date}>
        <Logo src='/img/waffle-logo.png' />
        <DownloadPanel>
          <a href="https://play.google.com/store/apps/details?id=com.wafflestudio.siksha">
            <Download src='/img/google-play.png' />
          </a>
          <a href="https://apps.apple.com/kr/app/id1032700617">
            <Download src='/img/app-store.png' />
          </a>
        </DownloadPanel>
      </Footer>
    </MainContainerBlock>
  );
};

export default MainContainer;