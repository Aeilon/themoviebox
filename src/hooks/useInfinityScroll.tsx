import React, { useRef, useCallback } from "react";

const useInfinityScroll = (
  setPage: React.Dispatch<React.SetStateAction<number>>,
  hasMore: boolean,
  loading: boolean
):
  | string
  | null
  | ((instance: HTMLDivElement | null) => void)
  | undefined
  | React.RefObject<HTMLDivElement> => {
  const observer = useRef<IntersectionObserver>();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line
    [loading, hasMore]
  );
  return lastMovieElementRef;
};
export default useInfinityScroll;
