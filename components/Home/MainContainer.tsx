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
          <MenuCardContainer key={index}>
            <MenuCard restaurant={restaurant} key={restaurant.name_en} />
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