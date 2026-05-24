"use client";
import { useEffect } from "react";
import RestaurantOrderEditor from "components/Account/RestaurantOrderEditor";
import styled from "styled-components";
import { getRestaurantList } from "utils/api/restaurants";
import MobileSubHeader from "components/general/MobileSubHeader";
import { useRouter } from "next/navigation";
import { RestaurantPreview } from "types";
import useOrder from "hooks/UseOrder";
import AccountLayout from "app/account/layout";
import useAuth from "hooks/UseAuth";
import useFavorite from "hooks/UseFavorite";
import useError from "hooks/useError";

export default function FavoriteOrderSetting() {
  const { authStatus, authGuard } = useAuth();
  const router = useRouter();
  const { orderList, setNewOrderList, getStoredOrderList } = useOrder("favorite");

  const { getStoredFavorites } = useFavorite();

  const { onHttpError } = useError();

  useEffect(authGuard, [authStatus]);

  useEffect(() => {
    getRestaurantList()
      .then((result) => {
        const storedOrder = getStoredOrderList();
        const favorites = getStoredFavorites();
        const apiById = new Map(result.map((restaurant) => [restaurant.id, restaurant]));
        const isFavorite = (id: number) => apiById.has(id) && favorites.includes(id);

        // 1. 저장된 순서 유지 + (사라졌거나 즐겨찾기 해제된) 식당 제거 + 이름은 API 기준으로 갱신
        const ordered: RestaurantPreview[] = storedOrder
          .filter((res) => isFavorite(res.id))
          .map(({ id }) => {
            const { nameKr, nameEn } = apiById.get(id)!;
            return { id, nameKr, nameEn };
          });

        // 2. 즐겨찾기에 새로 추가된 식당을 뒤에 추가
        const orderedIds = new Set(ordered.map((res) => res.id));
        const appended: RestaurantPreview[] = result
          .filter(({ id }) => isFavorite(id) && !orderedIds.has(id))
          .map(({ id, nameKr, nameEn }) => ({ id, nameKr, nameEn }));

        setNewOrderList([...ordered, ...appended]);
      })
      .catch(onHttpError);
  }, []);

  const reorder = (source: number, destination: number) => {
    const copyData = [...orderList];
    const sourceData = copyData[source];
    copyData.splice(source, 1);
    copyData.splice(destination, 0, sourceData);
    setNewOrderList(copyData);
  };

  return (
    <>
      <MobileSubHeader title="즐겨찾기 식당 순서 변경" handleBack={() => router.push("/account")} />
      <Container>
        <RestaurantOrderEditor order={orderList} reorder={reorder} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 0px;
    height: calc(100% - 60px);
  }
`;
