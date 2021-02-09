import styled from 'styled-components'
import classNames from 'classnames'
import { restaurant } from '../../interfaces'
import styles from '../../public/css/my-icons/my-icons.module.css'

const ModalContainerBlock = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  z-index: 4;

  .modal {
    display: none;
    position: fixed;

    width: 85%;
    height: 20%;

    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

    z-index: 5;

    h4 {
      margin: 10px 0;
      color: #6c6b70;
      font-family: 'NanumSquare';
      font-weight: bold;
    }

    p {
      margin: 0;
      text-align: left;
      color: #6c6b70;
      font-size: 12pt;
    }

    .mobile-info-container {
      background-color: white;
      padding: 15px 25px;

      .modal-title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 20px;

        .close-icon {
          color: #6C6B70;
        }

        .mobile-info-title {
          margin: 0px;
        }
      }

      .icon-text-container {
        display: flex;
        margin: 10px 0px;

        .location-icon {
          color: #fe8b5a;
          font-size: 17pt;
          padding: 0 3.5px;
          margin-top: 1px;
        }

        .clock-icon {
          color: #fe8b5a;
          font-size: 17pt;
          margin-top: 1px;
        }

        .location {
          margin: 0 15px;
          line-height: 25px;
        }

        .modal-text {
          font-size: 11pt;
        }

        .operating-hours {
          white-space: pre-line;
          text-align: left;
          line-height: 25px;
          margin: 0 15px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    display: block;

    .modal {
      display: block;
    }
  }
`;

type ModalContainerProps = {
  restaurant: restaurant,
  setIsModalOpen: Function
}

const ModalContainer: React.FC<ModalContainerProps> = ({ restaurant, setIsModalOpen }) => {
  return (
    <ModalContainerBlock>
      <div className="modal">
        <div className="mobile-info-container">
          <div className="modal-title-container">
            <h4 className="mobile-info-title">{restaurant.name_kr}</h4>
            <i onClick={() => setIsModalOpen(false)} className={classNames(styles['my-icon'], styles['my-icon-close-icon'], "close-icon")}></i>
          </div>
          <div className="icon-text-container">
            <i className={classNames(styles['my-icon'], styles['my-icon-location_full'], "location-icon")}></i>
            <p className="location modal-text">{restaurant.addr}</p>
          </div>
          <div className="icon-text-container">
            <i className={classNames(styles['my-icon'], styles['my-icon-clock_full'], "clock-icon")}></i>
            <p className="operating-hours modal-text">나중에</p>
          </div>
        </div>
      </div>
    </ModalContainerBlock>
  );
};

export default ModalContainer;