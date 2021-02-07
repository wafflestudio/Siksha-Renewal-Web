import styled from 'styled-components'
import classNames from 'classnames'
import { useDispatchContext, useStateContext } from '../../utils/hooks/ContextProvider';
import { menuData } from '../../utils/menuData'
import { useState } from 'react';
import { restaurant } from '../../interfaces';

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

  .popper {
    border: solid 1px black;

    .contact-waffle {
      margin-left: 45px;
      background-color: white;
      white-space: pre-line;
      text-align: left;
      padding: 20px 15px;
      font-size: 10pt;
      line-height: 17px;
      color: #6C6B70;
      box-shadow: 1px 1px 17px rgba(0,0,0,0.06);
      position: absolute;
      top: 635px;

      p {
        margin: 0;
        font-family: 'NanumSquare';
      }

      a {
        font-family: 'NanumSquare';
      }
    }

    .waffle-logo-container {
      width: 280px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 535px;

      .waffle-logo {
        height: 80px;
        object-fit: contain;
        cursor: pointer;
      }

      .blurred-waffle-logo {
        opacity: 0.7;
      }
    }
  }
`;

function scrollRestaurant(restaurant: string) {
  let element = document.querySelector('.a'+restaurant)
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
  const { date, meal } = state;

  const [focusedRestaurant, setFocusedRestaurant] = useState<string>('')
  const [isContactBoxClosed, setContactBoxState] = useState<boolean>(true)

  const dateIndex = menuData.findIndex(day => day.date === date)

  return (
    <SidebarContainerBlock>
      <div className="sidebar">
        {menuData[dateIndex][meal].map((restaurant: restaurant) => (
          <button 
            className="sidebar-button"
            tabIndex={1}
            onClick={() => scrollRestaurant(restaurant.name_en.replace(/\s/g, ''))}
            onFocus={() => setFocusedRestaurant(restaurant.name_en)}
            onBlur={() => setFocusedRestaurant('')}
            key={restaurant.name_en}
          >
            <div className={classNames("bullet", { "visible-bullet": restaurant.name_en === focusedRestaurant })} />
            {restaurant.name_kr}
          </button>
        ))}
      </div>
      <div className="popper">
        {!isContactBoxClosed && (<div className="contact-waffle">
          <p>와플스튜디오</p>
          <a href="https://wafflestudio.com">wafflestudio.com</a>
          <p>
            만든 사람들
            조규상 박지유 박석현 박주현 조일현
          </p>
        </div>)}
        <div className="waffle-logo-container" onClick={() => setContactBoxState(!isContactBoxClosed)}>
          <img 
            className={classNames("waffle-logo", { "blurred-waffle-logo": isContactBoxClosed })} 
            src="/img/waffle-logo.png"
            alt="waffle-logo"
          />
        </div>
      </div>
    </SidebarContainerBlock>
  );
};

export default SidebarContainer;