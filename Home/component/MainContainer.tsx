import styled from 'styled-components'
import Image from 'next/image'
import MenuCard from './MenuCard'
import { Data, Restaurant } from '../../interfaces'
import { useStateContext } from '../../utils/hooks/ContextProvider'
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

const LogoPanel = styled.div`
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
    margin: 20px 0 0 0;
    width: 60%;
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

type Props = {
  data: Data
}

const MainContainer: React.FC<Props> = ({ data }) => {
  const state = useStateContext()
  const { date, meal } = state
  const menuData = data.result

  const dateIndex = useMemo(() => menuData.findIndex(day => new Date(day.date).toDateString() === date.toDateString()), [menuData, date])

  return (
    <MainContainerBlock key={meal+date}>
      {menuData[dateIndex] && (menuData[dateIndex][meal].length === 0 && <TextContainer key={'text'+meal+date}>업로드 된 식단이 없습니다.</TextContainer>)}
      <MenuContainer>
        {(menuData[dateIndex] && menuData[dateIndex][meal]) && menuData[dateIndex][meal].map((restaurant: Restaurant) => (
          <MenuCardContainer key={restaurant.id+meal+date}>
            <MenuCard restaurant={restaurant} />
          </MenuCardContainer>
        ))}
      </MenuContainer>
      <Footer key={'footer'+meal+date}>
        <LogoPanel>
          <Image 
            src="/img/waffle-logo.png" 
            alt="waffle-logo" 
            width='329'
            height='117'
          />
        </LogoPanel>
        <DownloadPanel>
          <Image
            src="/img/google-play.png"
            alt="google-play"
            width='103'
            height='31'
          />
          <Image
            src="/img/app-store.png"
            alt="google-play"
            width='103'
            height='31'
          />
        </DownloadPanel>
      </Footer>
    </MainContainerBlock>
  );
};

export default MainContainer;