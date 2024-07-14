import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface InfiniteScrollableProps {
  fetchMoreData: (size: number, page: number) => Promise<any>;
  hasNext: boolean;
  children: JSX.Element | JSX.Element[] | [];
}

export default function InfiniteScrollable({
  fetchMoreData,
  hasNext,
  children,
}: InfiniteScrollableProps) {
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const router = useRouter();
  const currentPath = router.asPath;

  const observerElement = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNext) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasNext, currentPath],
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
    if (page >= 2) {
      fetchMoreData(size, page);
      console.log(page, "is requested");
    }
  }, [page]);

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
