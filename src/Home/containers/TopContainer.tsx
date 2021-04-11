import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Data } from '../../interfaces'
import { useDispatchContext, useStateContext } from '../../utils/ContextProvider'
import { formatISODate, getTomorrow, getYesterday } from '../../utils/FormatUtil'
import { AdditionalHeader, FixedHeader, MainContainer, SidebarContainer } from '../index'

const TopContainerBlock = styled.div`
  text-align: center;
`

const TopContainer = () => {
  const date = useMemo(() => new Date(), [])
  const yesterday = useMemo(() => formatISODate(getYesterday(date)), [date])
  const tomorrow = useMemo(() => formatISODate(getTomorrow(date)), [date])

  const state = useStateContext()
  const dispatch = useDispatchContext()

  const { data } = state

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const setData = (data: Data) => dispatch({ type: 'SET_DATA', data: data })

      setLoading(true)
      try {
        const res = await axios.get(`https://siksha-api.wafflestudio.com/menus/?start_date=${yesterday}&end_date=${tomorrow}&except_empty=true`)
        const newData = await res.data
        setData({...data, ...newData})
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }

    fetchData();
  }, [yesterday, tomorrow, data, dispatch])

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