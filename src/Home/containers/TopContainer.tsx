import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Data, Day } from '../../interfaces'
import { useDispatchContext, useStateContext } from '../../utils/ContextProvider'
import { formatISODate, getTomorrow, getYesterday } from '../../utils/FormatUtil'
import { AdditionalHeader, FixedHeader, MainContainer, SidebarContainer } from '../index'

const TopContainerBlock = styled.div`
  text-align: center;
`

const TopContainer = () => {
  const date = useMemo(() => new Date(), [])

  const state = useStateContext()
  const dispatch = useDispatchContext()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data, date } = state
      const menus: Day[] = data ? data.result : []

      if(!menus.find(day => new Date(day.date).toDateString() === date.toDateString())) {
        const setData = (data: Data) => dispatch({ type: 'SET_DATA', data: data })
        const dateString = formatISODate(date)

        setLoading(true)
        try {
          const res = await axios.get(`https://siksha-api.wafflestudio.com/menus/?start_date=${dateString}&end_date=${dateString}&except_empty=true`)
          const newData = await res.data
          setData({...data, ...newData})
        } catch (e) {
          console.log(e)
        }
        setLoading(false)
      }
    }

    fetchData();
    
  }, [state, dispatch])

  return (
    <TopContainerBlock>
      <AdditionalHeader />
      <FixedHeader />
      <SidebarContainer />
      <MainContainer loading={loading} />
    </TopContainerBlock>
  );
}

export default TopContainer