import { useEffect, useState } from "react";
import { useStateContext } from "../../../hooks/ContextProvider";
import axios from "axios";
import APIendpoint from "../../../constants/constants";
import RestaurantOrderEdit from "../../../components/Account/RestaurantOrderEdit";
import { GlobalStyle } from "../../../styles/globalstyle";
import AccountLayout from "../layout";
import Header from "../../../components/Header";
import styled from "styled-components";

interface Restaurant {
  id: number;
  name_kr: string;
  name_en: string;
}

export default function Setting_NonFavorite() {
  const state = useStateContext();

  const [orderData, setOrderData] = useState<Restaurant[]>([]);
  const getMenuData = async () => {
    try {
      const orderList: Restaurant[] = JSON.parse(
        localStorage.getItem("orderList_nonFavorite") ?? "[]",
      );
      const {
        data: { result },
      }: { data: { result: Restaurant[] } } = await axios.get(`${APIendpoint()}/restaurants/`);
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

  const setNewOrderData = (source: number, destination: number) => {
    const copyData = [...orderData];
    const sourceData = copyData[source];
    copyData.splice(source, 1);
    copyData.splice(destination, 0, sourceData);
    setOrderData(copyData);
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <RestaurantOrderEdit orderData={orderData} setNewOrderData={setNewOrderData} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36.92px;
`;
