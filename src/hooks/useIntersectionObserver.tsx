import { useEffect, useRef, RefObject } from "react";

type TIntersectionObserverProps = {
  target: RefObject<Element>;
  onIntersect: () => void;
  enabled?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

const useIntersectionObserver = ({
  target,
  onIntersect,
  enabled = true,
  root = null,
  rootMargin = "0px",
  threshold = 1.0,
}: TIntersectionObserverProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onIntersect(),
      { root, rootMargin, threshold }
    );

    const currentTarget = target?.current; // 현재 관찰 대상 요소
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    // Cleanup 함수
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [target, onIntersect, enabled, root, rootMargin, threshold]);

  return observerRef;
};

export default useIntersectionObserver;
