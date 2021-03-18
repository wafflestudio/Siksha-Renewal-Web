import styled from 'styled-components'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { useDispatchContext, useStateContext } from '../../utils/ContextProvider'
import { formatDate } from '../../utils/FormatUtil'
import { useMemo, useState } from 'react'

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

const ArrowButton = styled.button<{ isEnd: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  font-size: 12pt;
  font-family: 'NanumSquare';
  color: ${props => props.isEnd ? '#e0e0e0' : '#bababa'};
  white-space: nowrap;

  svg {
    font-size: 13pt;
    margin: 0 10px;
    margin-top: -1px;
  }

  &:hover {
    color: ${props => props.isEnd ? '#e0e0e0' : '#fa9a44'};
  }

  @media (max-width: 768px) {
    font-size: 11pt;

    &:hover {
      color: ${props => props.isEnd ? '#e0e0e0' : '#bababa'};
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

  const [start, setStart] = useState(false)
  const [end, setEnd] = useState(false)

  const startDate = useMemo(() => new Date(), [])
  useMemo(() => startDate.setDate(startDate.getDate() - 7), [startDate])
  const endDate = useMemo(() => new Date(), [])
  useMemo(() => endDate.setDate(endDate.getDate() + 7), [endDate])

  useMemo(() => date.toDateString() === startDate.toDateString() ? setStart(true) : setStart(false), [date, startDate])
  useMemo(() => date.toDateString() === endDate.toDateString() ? setEnd(true) : setEnd(false), [date, endDate])

  const getYesterday = (date: Date) => {
    const yesterday = new Date(date)
    yesterday.setDate(date.getDate() - 1)
    return yesterday
  }
  
  const getTomorrow = (date: Date) => {
    const tomorrow = new Date(date)
    tomorrow.setDate(date.getDate() + 1)
    return tomorrow
  }

  const yesterday = useMemo(() => formatDate(getYesterday(date)), [date])
  const tomorrow = useMemo(() => formatDate(getTomorrow(date)), [date])

  return (
    <DateContainerBlock>
      <ArrowButton isEnd={start} onClick={() => date.toDateString() !== startDate.toDateString() && setDate(getYesterday(date))}>
        <BsChevronLeft />
        {yesterday}
      </ArrowButton>
      <TimeButton>{formatDate(date)}</TimeButton>
      <ArrowButton isEnd={end} onClick={() => date.toDateString() !== endDate.toDateString() && setDate(getTomorrow(date))}>
        {tomorrow}
        <BsChevronRight />
      </ArrowButton>
    </DateContainerBlock>
  )
}

export default DateContainer