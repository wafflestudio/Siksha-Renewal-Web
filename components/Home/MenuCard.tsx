import styled from 'styled-components'
import classNames from 'classnames'
import { menu, restaurant } from '../../interfaces'
import styles from '../../public/css/my-icons/my-icons.module.css'
import { useState } from 'react'

const MenuCardBlock = styled.div`
  @font-face {
    font-family: 'Lato';
    src: url('/font/Lato-Regular.ttf') format("truetype");
  }

  display: flex;
  box-shadow: 1px 1px 17px rgba(0,0,0,0.06);
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 25px;
  background: white;
  padding: 5px 20px;

  p {
    margin: 0;
    text-align: left;
    color: #6c6b70;
    font-size: 12pt;
  }

  .restaurant-name-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    h4 {
      margin: 10px 0;
      color: #6c6b70;
      font-family: 'NanumSquare';
      font-weight: bold;
    }

    .information-button {
      display: none;
    }
  }

  .underline {
    width: 100%;
    height: 2px;
    background-color: #ff9a44;
  }

  .content-container {
    display: flex;
    width: 100%;
    margin: 30px 0;

    .restaurant-info-container {
      width: 50%;
      border-right: #d6d6d6 0.5px solid;
      padding: 0 20px;
      margin-top: -1.5px;

      .icon-text-container {
        display: flex;
        margin: 10px 0px;

        .location-icon {
          color: #fe8b5a;
          font-size: 17pt;
          padding: 0 3.5px;
          margin-top: 1px;
        }

        .location {
          margin: 0 15px;
          line-height: 25px;
        }

        .clock-icon {
          color: #fe8b5a;
          font-size: 17pt;
          margin-top: 1px;
        }

        .operating-hours {
          white-space: pre-line;
          text-align: left;
          line-height: 25px;
          margin: 0 15px;
        }
      }
    }

    .menus-container {
      padding: 0 20px;
      width: 100%;

      .menu-info-container {
        display: flex;
        margin: 7px 0;

        .price-container {
          background-color: #fe8b5a;
          padding: 0 12px;
          height: 25px;
          display: block;
          border-radius: 13px;
          margin-right: 10px;

          .price {
            color: white;
            font-family: 'Lato';
            margin-top: 2px;
            margin-bottom: 1.5px;
          }
        }

        .menu-name {
          line-height: 20px;
          margin-top: 3px;
          word-break: break-all;
          white-space: pre-line;
        }
      }
    }
  }

  @media (max-width: 768px) {
    margin: 5px 25px;

    .content-container {
      margin: 10px 0px;

      .restaurant-info-container {
        display: none;
      }
    }
    .menus-container {
      width: 100%;
      padding: 0;
    }
    
    .information-button {
      display: block !important;
      border: none;
      background: none;
      padding: 0px;

      &:focus {
        outline: none;
      }

      .info-icon {
        font-size: 15pt;
        color: #FF9A44;
      }
    }
  }
`;

interface MenuCardProps {
  restaurant: restaurant;
}

const MenuCard: React.FC<MenuCardProps> = ({ restaurant }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  
  return (
    <MenuCardBlock className={"a"+restaurant.name_en.replace(/\s/g, '')}>
      <div className="restaurant-name-container">
        <h4>{restaurant.name_kr}</h4>
        <button className="information-button" onClick={() => setShowModal(true)}>
          <i className={classNames(styles['my-icon'], styles['my-icon-info-icon'], "info-icon")}></i>
        </button>
      </div>
      <div className="underline"/>
      <div className="content-container">
        <div className="restaurant-info-container">
          <div className="icon-text-container">
            <i className={classNames(styles['my-icon'], styles['my-icon-location_full'], "location-icon")}></i>
            <p className="location">{restaurant.addr}</p>
          </div>
          <div className="icon-text-container">
            <i className={classNames(styles['my-icon'], styles['my-icon-clock_full'], "clock-icon")}></i>
            <p className="operating-hours">
              나중에
            </p>
          </div>
        </div>
        <div className="menus-container">
          {restaurant.menus.map((menu: menu) => (
            <div className="menu-info-container" key={menu.id}>
              <div className="price-container">
                <p className="price">{menu.price}</p>
              </div>
              <p className="menu-name">{menu.name_kr}</p>
            </div>
          ))}
        </div>
      </div>
    </MenuCardBlock>
  );
};

export default MenuCard;