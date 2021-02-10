import styled from 'styled-components'
import { restaurant } from '../../interfaces';
import { useStateContext } from '../../utils/hooks/ContextProvider'
import { menuData } from '../../utils/menuData'
import MenuCard from './MenuCard'


const MainContainerBlock = styled.div`
  display: inline-block;
  margin-top: -10px;

  .menu-container {
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
  }

  .mobile-waffle-logo {
    display: none;
  }

  @media (max-width: 768px) {
    .menu-container {
      width: 97vw;
      padding-top: 0px;
      margin-top: -7px;
      margin-left: 0px;

      .menu-card-container {
        margin: 0 25px;
      }
    }

    .mobile-waffle-logo {
      display: inline-block;
      width: 50%;
      opacity: 0.8;
      margin: 20px 0px;
      object-fit: contain;
    }
  }
`;

const MainContainer = () => {
  const state = useStateContext()
  const { date, meal } = state

  const dateIndex = menuData.findIndex(day => day.date === date)

  return (
    <MainContainerBlock>
      <div className="menu-container">
        {(menuData[dateIndex] && menuData[dateIndex][meal]) && menuData[dateIndex][meal].map((restaurant: restaurant) => (
          <div className="menu-card-container" key={restaurant.name_en}>
            <MenuCard restaurant={restaurant} key={restaurant.name_en} />
          </div>
        ))}
      </div>
      <img className="mobile-waffle-logo" src="/img/waffle-logo.png"></img>
    </MainContainerBlock>
  );
};

export default MainContainer;