"use client";
import { useEffect } from "react";
import RestaurantOrderEditor from "components/Account/RestaurantOrderEditor";
import styled from "styled-components";
import { getRestaurantList } from "utils/api/restaurants";
import MobileSubHeader from "components/general/MobileSubHeader";
import { useRouter } from "next/navigation";
import { RestaurantPreview } from "types";
import useOrder from "hooks/UseOrder";
import AccountLayout from "../layout";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

export default function NonFavoriteOrderSetting() {
  const { authStatus, authGuard } = useAuth();
  const router = useRouter();
  const { orderList, setNewOrderList, getStoredOrderList } = useOrder("nonFavorite");

  const { onHttpError } = useError();

  useEffect(authGuard, [authStatus]);

  useEffect(() => {
    getRestaurantList()
      .then((result) => {
        const storedOrder = getStoredOrderList();
        const apiById = new Map(result.map((restaurant) => [restaurant.id, restaurant]));

        // 1. 저장된 순서 유지 + 사라진 식당 제거 + 이름은 API 기준으로 갱신
        const ordered: RestaurantPreview[] = storedOrder
          .filter((res) => apiById.has(res.id))
          .map(({ id }) => {
            const { nameKr, nameEn } = apiById.get(id)!;
            return { id, nameKr, nameEn };
          });

        // 2. 저장된 순서엔 없지만 API엔 있는 새 식당을 뒤에 추가
        const orderedIds = new Set(ordered.map((res) => res.id));
        const appended: RestaurantPreview[] = result
          .filter(({ id }) => !orderedIds.has(id))
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
      <MobileSubHeader title="식당 순서 변경" handleBack={() => router.push("/account")} />
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
