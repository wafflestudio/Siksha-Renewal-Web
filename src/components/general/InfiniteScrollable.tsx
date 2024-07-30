import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface InfiniteScrollableProps {
  fetchMoreData: (size: number, page: number) => Promise<boolean | void>;
  children: JSX.Element | JSX.Element[] | [];
}

export default function InfiniteScrollable({ fetchMoreData, children }: InfiniteScrollableProps) {
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const [hasNext, setHasNext] = useState(false);

  const observerElement = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNext) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasNext],
  );

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
  }, [observerCallback]);

  useEffect(() => {
    async function fetch() {
      const hasNext = await fetchMoreData(size, page);
      console.log(page, "is requested");
      if (typeof hasNext === "boolean") setHasNext(hasNext);
    }
    fetch();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <Container>
      {children}
      <div style={{ height: "1px" }} ref={observerElement} />
    </Container>
  );
}

const Container = styled.div``;
