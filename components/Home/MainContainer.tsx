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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 768px) {
    width: 100vw;
  }
`

const MenuCardContainer = styled.div`
  width: 100%;
  max-width: 800px;

  animation: fadein 1s;
  -moz-animation: fadein 1s; /* Firefox */
  -webkit-animation: fadein 1s; /* Safari and Chrome */
  -o-animation: fadein 1s; /* Opera */

  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(15%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @-moz-keyframes fadein { /* Firefox */
    from {
      opacity: 0;
      transform: translateY(15%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @-webkit-keyframes fadein { /* Safari and Chrome */
    from {
      opacity: 0;
      transform: translateY(15%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @-o-keyframes fadein { /* Opera */
    from {
      opacity: 0;
      transform: translateY(15%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`

const ImagePanel = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: inline-block;
    opacity: 0.8;
    margin: 20px 0px;
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
    <MainContainerBlock>
      <MenuContainer>
        {(menuData[dateIndex] && menuData[dateIndex][meal]) && menuData[dateIndex][meal].map((restaurant: Restaurant, index) => (
          <MenuCardContainer key={restaurant.id+meal+date}>
            <MenuCard restaurant={restaurant} />
          </MenuCardContainer>
        ))}
      </MenuContainer>
      <ImagePanel>
        <Image 
          src="/img/waffle-logo.png" 
          alt="waffle-logo" 
          width='329'
          height='117'
        />
      </ImagePanel>
    </MainContainerBlock>
  );
};

export default MainContainer;