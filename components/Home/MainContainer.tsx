import styled from 'styled-components'
import { restaurant } from '../../interfaces';
import { useStateContext } from '../../utils/hooks/ContextProvider'
import { menuData } from '../../utils/menuData'
import MenuCard from './MenuCard'


const MainContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;

  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .menu-card-container {
    margin: 0 40px;
    width: 100%;
    max-width: 800px;
  }

  @media (max-width: 768px) {
    width: 97vw;
    padding-top: 0px;
    margin-top: 0px;
    margin-left: 0px;

    .menu-card-container {
      margin: 0 25px;
    }
  }
`;

const MainContainer = () => {
  const state = useStateContext()
  const { date, meal } = state

  const dateIndex = menuData.findIndex(day => day.date === date)

  return (
    <MainContainerBlock>
      {menuData[dateIndex][meal] && menuData[dateIndex][meal].map((restaurant: restaurant) => (
        <div className="menu-card-container" key={restaurant.name_en}>
          <MenuCard restaurant={restaurant} key={restaurant.name_en} />
        </div>
      ))}
    </MainContainerBlock>
  );
};

export default MainContainer;