import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Data } from '../../interfaces'
import { useDispatchContext } from '../../utils/ContextProvider'
import { formatISODate } from '../../utils/FormatUtil'
import { AdditionalHeader, FixedHeader, MainContainer, SidebarContainer } from '../index'

const TopContainerBlock = styled.div`
  text-align: center;
`

const TopContainer = () => {
  const startDate = useMemo(() => new Date(), [])
  useMemo(() => startDate.setDate(startDate.getDate() - 7), [startDate])
  const endDate = useMemo(() => new Date(), [])
  useMemo(() => endDate.setDate(endDate.getDate() + 7), [endDate])

  const dispatch = useDispatchContext()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const setData = (data: Data) => dispatch({ type: 'SET_DATA', data: data })

      setLoading(true)
      try {
        const res = await fetch(`https://siksha-api.wafflestudio.com/menus?start_date=${formatISODate(startDate)}&end_date=${formatISODate(endDate)}&except_empty=true`)
        const data = await res.json()
        setData(data)
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }

    fetchData();
  }, [startDate, endDate, dispatch])

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