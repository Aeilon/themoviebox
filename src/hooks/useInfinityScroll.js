import { useRef, useCallback } from "react";

const useInfinityScroll = (setPage, hasMore, loading) => {
  const observer = useRef();
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
