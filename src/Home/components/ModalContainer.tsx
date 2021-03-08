import { useMemo } from 'react'
import styled from 'styled-components'
import { Restaurant } from '../../interfaces'
import { IoCloseOutline } from 'react-icons/io5'
import { useStateContext } from '../../utils/ContextProvider'
import { formatWeek } from '../../utils/FormatUtil'
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

const CloseIcon = styled(IoCloseOutline)`
  color: #6C6B70;
  font-size: 21pt;
`

const Location = styled.p`
  margin: 2px 0 0 10px;
  line-height: 25px;
  font-size: 11pt;
`

const OperatingHours = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-line;
  text-align: left;
  margin: 2.8px 0 6px 12px;
`

const Hours = styled.p`
  white-space: nowrap;
  text-align: left;
  line-height: 25px;
  padding: 0;
  margin: 0;
  font-size: 11pt;
`

const Week = styled.p`
  white-space: nowrap;
  display: flex;
  align-items: flex-end;
  text-align: left;
  font-size: 10pt !important;
  line-height: 25px;
  padding: 0;
  margin: 0 0 6.5px 5px;
`

type ModalContainerProps = {
  restaurant: Restaurant,
  setIsModalOpen: Function
}

const ModalContainer: React.FC<ModalContainerProps> = ({ restaurant, setIsModalOpen }) => {
  const { date } = useStateContext()
  const week = useMemo(() => formatWeek(date), [date])

  return (
    <ModalContainerBlock>
      <Modal>
        <ModalTitleContainer>
          <ModalTitle>{restaurant.name_kr}</ModalTitle>
          <CloseIcon onClick={() => setIsModalOpen(false)} />
        </ModalTitleContainer>
        <IconTextContainer>
          <LocationIcon />
          <Location>
            {restaurant.addr.slice(13) || '위치 정보 없음'}
          </Location>
        </IconTextContainer>
        <IconTextContainer>
          <ClockIcon />
          <OperatingHours>
            {(restaurant.etc && restaurant.etc.operating_hours[week].length !== 0) ? restaurant.etc.operating_hours[week].map((hour, index) => <Hours key={index}>{hour}</Hours>) : <Hours>운영시간 정보없음</Hours>}
          </OperatingHours>
          <Week>{week === 'holiday' ? '(일요일/공휴일)' : week === 'saturday' ? '(토요일)' : '(평일)'}</Week>
        </IconTextContainer>
      </Modal>
    </ModalContainerBlock>
  );
};

export default ModalContainer;