import { RefObject, useEffect, useState } from "react";

const useBannerVisibility = (
  ref: RefObject<HTMLElement | null>
) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
};

export default useBannerVisibility;