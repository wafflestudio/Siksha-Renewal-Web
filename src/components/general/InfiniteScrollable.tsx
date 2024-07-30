import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface InfiniteScrollableProps {
  fetchMoreData: (size: number, page: number) => Promise<boolean | void>;
  children: JSX.Element | JSX.Element[];
  setIsLoading?: (value: boolean) => void;
}

export default function InfiniteScrollable({
  fetchMoreData,
  children,
  setIsLoading,
}: InfiniteScrollableProps) {
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const [hasNext, setHasNext] = useState(false);
  const currentPath = typeof window !== "undefined" ? window.location.href : null;

  const observerElement = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNext) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasNext, currentPath],
  );

  async function loadingWrapper(callback: () => Promise<void>) {
    if (page === 1) setIsLoading?.(true);
    await callback();
    setIsLoading?.(false);
  }

  async function handleFetchMoreData() {
    const hasNext = await fetchMoreData(size, page);
    if (typeof hasNext === "boolean") setHasNext(hasNext);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);
    if (observerElement.current) {
      observer.observe(observerElement.current);
    }
    return () => {
      if (observerElement.current) {
        observer.unobserve(observerElement.current);
      }
    };
  }, [observerCallback, currentPath]);

  useEffect(() => {
    loadingWrapper(handleFetchMoreData);
  }, [page]);

  useEffect(() => {
    if (page === 1) loadingWrapper(handleFetchMoreData);
  }, [currentPath]);

  useEffect(() => {
    setPage(1);
  }, [currentPath]);

  return (
    <Container>
      {children}
      <div style={{ height: "1px" }} ref={observerElement} />
    </Container>
  );
}

const Container = styled.div``;
