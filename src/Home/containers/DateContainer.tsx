import styled from 'styled-components'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { useDispatchContext, useStateContext } from '../../utils/ContextProvider'
import { formatDate, getTomorrow, getYesterday } from '../../utils/FormatUtil'
import { useMemo } from 'react'

const DateContainerBlock = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 25px;
  background: white;
  box-shadow: 1px 1px 17px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    box-shadow: 0px 0.5px 2px rgba(0, 0, 0, 0.25);
    margin-top: 0;
  }

  button {
    &:active {
      background-color: none;
    }
  }
`

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  font-size: 12pt;
  font-family: 'NanumSquare';
  color: #bababa;
  white-space: nowrap;

  svg {
    font-size: 13pt;
    margin: 0 10px;
    margin-top: -1px;
  }

  &:hover {
    color: #fa9a44;
  }

  @media (max-width: 768px) {
    font-size: 11pt;

    &:hover {
      color: #bababa;
    }

    svg {
      font-size: 12pt;
    }
  }
`

const TimeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13pt;
  font-family: 'NanumSquare';
  font-weight: bold;
  color: #fa9a44;
  height: 55px;
  width: 140px;
  border: none;
  background: none;
  outline: none;
  border-bottom: solid 3px #fa9a44;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 12pt;
    width: 120px;
  }
`

const DateContainer: React.FC = () => {
  const state = useStateContext()
  const dispatch = useDispatchContext()

  const { date } = state
  const setDate = (date: Date) => dispatch({ type: 'SET_DATE', date: date })

  const yesterday = useMemo(() => formatDate(getYesterday(date)), [date])
  const tomorrow = useMemo(() => formatDate(getTomorrow(date)), [date])

  return (
    <DateContainerBlock>
      <ArrowButton onClick={() => setDate(getYesterday(date))}>
        <BsChevronLeft />
        {yesterday}
      </ArrowButton>
      <TimeButton>{formatDate(date)}</TimeButton>
      <ArrowButton onClick={() => setDate(getTomorrow(date))}>
        {tomorrow}
        <BsChevronRight />
      </ArrowButton>
    </DateContainerBlock>
  )
}

export default DateContainer