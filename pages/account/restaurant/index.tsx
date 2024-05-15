import { useEffect, useState } from "react";
import { useStateContext } from "../../../hooks/ContextProvider";
import axios from "axios";
import APIendpoint from "../../../constants/constants";

interface Restaurant {
  id: number;
  name_kr: string;
  name_en: string;
}

export default function Setting_NonFavorite() {
  const state = useStateContext();

  const { infoData, loginStatus, data, meal } = state;

  const [hasData, setHasData] = useState(false);
  const [orderData, setOrderData] = useState<Restaurant[]>([]);
  const [dragStartId, setDragStartId] = useState<number>(-1);
  const [dragEndId, setDragEndId] = useState<number>(-1);

  const getMenuData = async () => {
    try {
      const orderList: Restaurant[] = JSON.parse(
        localStorage.getItem("orderList_nonFavorite") ?? "[]",
      );
      const {
        data: { result },
      }: { data: { result: Restaurant[] } } = await axios.get(`${APIendpoint()}/restaurants/`);
      console.log(result);
      for (let i = 0; i < orderList.length; i++) {
        if (!result.find(({ id }) => id === orderList[i].id)) {
          orderList.splice(i, 1);
          i--;
        }
      }
      result.forEach(({ id, name_kr, name_en }) => {
        if (!orderList.some((menu) => Number(menu.id) === id))
          orderList.push({ id, name_kr, name_en });
      });

      console.log(orderList);
      setOrderData(orderList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenuData();
  }, []);

  useEffect(() => {
    if (!!orderData.length)
      localStorage.setItem("orderList_nonFavorite", JSON.stringify(orderData));
  }, [orderData]);
  /*
  useEffect(() => {
    if (!data[meal] || data[meal].length == 0) setHasData(false);
    else setHasData(true);
  }, [data, meal]);
*/

  const onDragStart = (event, index) => {
    setDragStartId(index);
  };

  const onDragEnter = (event, index) => {
    setDragEndId(index);
  };

  const onDragEnd = () => {
    const dragStartIndex = orderData.findIndex(({ id }) => id === dragStartId);
    const dragEndIndex = orderData.findIndex(({ id }) => id === dragEndId);
    if (dragStartIndex === -1 || dragEndIndex === -1 || dragStartIndex === dragEndIndex) return;
    const copyData = [...orderData];
    const temp = copyData[dragStartIndex];
    copyData[dragStartIndex] = copyData[dragEndIndex];
    copyData[dragEndIndex] = temp;
    console.log(copyData);
    setOrderData(copyData);
  };

  return (
    <>
      <div>
        {orderData.map(({ id, name_kr, name_en }) => (
          <div
            key={id}
            onDragStart={(event) => onDragStart(event, id)}
            onDragEnter={(event) => onDragEnter(event, id)}
            onDragEnd={onDragEnd}
            draggable={true}
          >
            {name_kr}
          </div>
        ))}
      </div>
    </>
  );
}
