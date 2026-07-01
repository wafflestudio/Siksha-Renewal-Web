"use client";
import { useEffect, useState } from "react";
import RestaurantOrderEditor from "components/Account/RestaurantOrderEditor";
import styled from "styled-components";
import {
  getPersonalRestaurantList,
  patchRestaurantOrder,
  patchRestaurantLike,
  patchRestaurantVisible,
} from "utils/api/restaurants";
import MobileSubHeader from "components/general/MobileSubHeader";
import { useRouter } from "next/navigation";
import { Restaurant } from "types";
import useAuth from "hooks/UseAuth";
import useError from "hooks/useError";

export default function NonFavoriteOrderSetting() {
  const { authStatus, authGuard, getAccessToken } = useAuth();
  const router = useRouter();
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const { onHttpError } = useError();

  useEffect(authGuard, [authStatus]);

  useEffect(() => {
    if (authStatus === "loading") return;
    if (authStatus !== "login") {
      setLoading(false);
      return;
    }

    getAccessToken()
      .then((token) => getPersonalRestaurantList(token))
      .then(setRestaurantList)
      .catch(onHttpError)
      .finally(() => setLoading(false));
  }, [authStatus]);

  const reorder = (source: number, destination: number) => {
    const newList = [...restaurantList];
    const [moved] = newList.splice(source, 1);
    newList.splice(destination, 0, moved);
    setRestaurantList(newList);
    getAccessToken()
      .then((token) => patchRestaurantOrder(token, newList.map((r) => r.id)))
      .catch(onHttpError);
  };

  const toggleLiked = (id: number) => {
    const current = restaurantList.find((r) => r.id === id);
    if (!current) return;
    const newLiked = !current.liked;
    const newVisible = newLiked ? true : current.visible ?? true;
    setRestaurantList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, liked: newLiked, visible: newVisible } : r)),
    );
    getAccessToken()
      .then((token) => {
        const calls: Promise<void>[] = [patchRestaurantLike(token, id, newLiked)];
        if (newVisible !== (current.visible ?? true)) {
          calls.push(patchRestaurantVisible(token, id, newVisible));
        }
        return Promise.all(calls);
      })
      .catch(onHttpError);
  };

  const toggleVisible = (id: number) => {
    const current = restaurantList.find((r) => r.id === id);
    if (!current) return;
    const newVisible = !(current.visible ?? true);
    const newLiked = newVisible ? current.liked : false;
    setRestaurantList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, visible: newVisible, liked: newLiked } : r)),
    );
    getAccessToken()
      .then((token) => {
        const calls: Promise<void>[] = [patchRestaurantVisible(token, id, newVisible)];
        if (!newVisible && current.liked) {
          calls.push(patchRestaurantLike(token, id, false));
        }
        return Promise.all(calls);
      })
      .catch(onHttpError);
  };

  if (loading) return null;

  return (
    <>
      <MobileSubHeader title="식당 순서 변경" handleBack={() => router.push("/account")} />
      <Container>
        <RestaurantOrderEditor
          order={restaurantList}
          reorder={reorder}
          onToggleLiked={toggleLiked}
          onToggleVisible={toggleVisible}
        />
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
