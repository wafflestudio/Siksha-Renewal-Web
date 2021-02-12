import styled from 'styled-components'
import Image from 'next/image'
import MenuCard from './MenuCard'
import { restaurant } from '../../interfaces'
import { useStateContext } from '../../utils/hooks/ContextProvider'
import { menuData } from '../../utils/menuData'

const MainContainerBlock = styled.div`
  display: inline-block;
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

const MainContainer = () => {
  const state = useStateContext()
  const { date, meal } = state

  const dateIndex = menuData.findIndex(day => day.date === date)

  return (
    <MainContainerBlock>
      <MenuContainer>
        {(menuData[dateIndex] && menuData[dateIndex][meal]) && menuData[dateIndex][meal].map((restaurant: restaurant) => (
          <MenuCardContainer key={restaurant.name_en}>
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