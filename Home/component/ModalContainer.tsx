import styled from 'styled-components'
import { Restaurant } from '../../interfaces'
import styles from '../../public/css/my-icons/my-icons.module.css'
import { IconTextContainer, LocationIcon, ClockIcon } from './MenuCard'

const ModalContainerBlock = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  z-index: 4;

  @media (max-width: 768px) {
    display: block;
  }
`

const Modal = styled.div`
  display: none;
  position: fixed;
  background: white;
  padding: 15px 25px;
  width: 75%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 5;

  @media (max-width: 768px) {
    display: block;
  }
`

const ModalTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  margin-top: 10px;
  margin-bottom: 20px;
`

const ModalTitle = styled.h4`
  margin: 0px;
  color: #6c6b70;
  font-family: 'NanumSquare';
  font-weight: bold;
`

const CloseIcon = styled.i`
  color: #6C6B70;
`

const Location = styled.p`
  margin: 2px 0 0 10px;
  line-height: 25px;
  font-size: 11pt;
`

const OperatingHours = styled.p`
  white-space: pre-line;
  text-align: left;
  line-height: 25px;
  margin: 2.8px 0 0 12px;
  font-size: 11pt;
`

type ModalContainerProps = {
  restaurant: Restaurant,
  setIsModalOpen: Function
}

const ModalContainer: React.FC<ModalContainerProps> = ({ restaurant, setIsModalOpen }) => {
  return (
    <ModalContainerBlock>
      <Modal>
        <ModalTitleContainer>
          <ModalTitle>{restaurant.name_kr}</ModalTitle>
          <CloseIcon onClick={() => setIsModalOpen(false)} className={`${styles['my-icon']} ${styles['my-icon-close-icon']}`} />
        </ModalTitleContainer>
        <IconTextContainer>
          <LocationIcon />
          <Location>
            {restaurant.addr || '위치 정보 없음'}
          </Location>
        </IconTextContainer>
        <IconTextContainer>
          <ClockIcon />
          <OperatingHours>9:00 ~ 11:00 / 12:00 ~ 14:00 / 17:00 ~ 19:00</OperatingHours>
        </IconTextContainer>
      </Modal>
    </ModalContainerBlock>
  );
};

export default ModalContainer;