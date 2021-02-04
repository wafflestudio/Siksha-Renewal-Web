import styled from 'styled-components'
import classNames from 'classnames'
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider';

const SidebarContainerBlock = styled.div`
  min-height: 100vh;
  width: 280px;
  min-width: 280px;

  .sidebar {
    width: inherit;
    height: 100vh;
    z-index: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .sidebar-button {
      background: none;
      border: none;
      font-size: 14px;
      font-family: 'NanumSquare';
      padding: 10px 15px;
      color: #6c6b70;
      width: 80%;
      display: flex;
      text-align: left;
      font-weight: 500;
      display: flex;
      align-items: center;
      margin: 0 20px;

      &:hover {
        color: #ff9a44;
      }

      &:focus {
        color: #ff9a44;
        font-weight: bold;
        outline: none;
        background: white;
        box-shadow: 1px 1px 17px rgba(0,0,0,0.06);
      }

      .bullet {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin-right: 20px;
      }

      .visible-bullet {
        background-color: #ff9a44;
      }
    }
  }
`;

const menuData = {
  today: {
    menus: [
      {
        type: 'BR',
        meals: ['a', 'b', 'c'],
        restaurant: {
          kr_name: '학식',
          en_name: 'haksik'
        }
      },
      {
        type: 'BR',
        meals: ['d', 'e'],
        restaurant: {
          kr_name: '자하연',
          en_name: 'jahayeon'
        }
      },
      {
        type: 'LU',
        meals: ['al', 'bl', 'cl'],
        restaurant: {
          kr_name: '학식',
          en_name: 'haksik'
        }
      },
      {
        type: 'LU',
        meals: ['dl', 'el'],
        restaurant: {
          kr_name: '자하연',
          en_name: 'jahayeon'
        }
      },
      {
        type: 'DN',
        meals: ['ad', 'cd'],
        restaurant: {
          kr_name: '학식',
          en_name: 'haksik'
        }
      }
    ]
  },

  tomorrow: {
    menus: [
      {
        type: 'BR',
        meals: ['ta', 'tb', 'tc'],
        restaurant: {
          kr_name: '학식',
          en_name: 'haksik'
        }
      },
      {
        type: 'BR',
        meals: ['td', 'te'],
        restaurant: {
          kr_name: '자하연',
          en_name: 'jahayeon'
        }
      },
      {
        type: 'LU',
        meals: ['tal', 'tbl', 'tcl'],
        restaurant: {
          kr_name: '학식',
          en_name: 'haksik'
        }
      },
      {
        type: 'LU',
        meals: ['tdl', 'tel'],
        restaurant: {
          kr_name: '자하연',
          en_name: 'jahayeon'
        }
      },
      {
        type: 'DN',
        meals: ['tad', 'tcd'],
        restaurant: {
          kr_name: '학식',
          en_name: 'haksik'
        }
      }
    ]
  }
}

function scrollRestaurant(restaurant: string) {
  let element = document.querySelector('#a'+restaurant)
  let headerOffset = 150
  let elementPosition = element!.getBoundingClientRect().top + window.pageYOffset;
  let offsetPosition = elementPosition - headerOffset;
  if((navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Firefox')) && !navigator.userAgent.includes('Edge')) {
    window.scrollTo({
      top: offsetPosition ? offsetPosition : elementPosition,
      behavior: 'smooth'
    });
  }
  else {
    window.scrollTo(0, offsetPosition)
  }
}

const SidebarContainer = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const { date, meal, restaurant } = state;
  const setRestaurant = (restaurant: string) => dispatch({ type: 'SET_RESTAURANT', restaurant: restaurant })

  return (
    <SidebarContainerBlock>
      <div className="sidebar">
        {((date === 'today' ? menuData.today : menuData.tomorrow).menus.filter(
          menu => menu.type === meal && menu.meals.length > 0)).map(
          menu => <button 
            className="sidebar-button" 
            tabIndex={1}
            //onClick={() => scrollRestaurant(menu.restaurant.en_name.replace(/\s/g, ''))}
            onFocus={() => setRestaurant(menu.restaurant.en_name)}
            onBlur={() => setRestaurant('')}
            key={menu.restaurant.en_name}
          >
            <div className={classNames("bullet", { "visible-bullet": menu.restaurant.en_name === restaurant })} />
            {menu.restaurant.kr_name}
          </button>
        )}
      </div>
    </SidebarContainerBlock>
  );
};

export default SidebarContainer;