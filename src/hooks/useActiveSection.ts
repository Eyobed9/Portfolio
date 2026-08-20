import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently under the header, for nav highlighting.
 *
 * Uses scroll position rather than IntersectionObserver so that tall sections
 * and the short final section both resolve predictably: the active section is
 * the last one whose top has passed the header, with the bottom of the document
 * always resolving to the last id.
 */
export const useActiveSection = (
  ids: readonly string[],
  offset: number,
): string => {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    const update = () => {
      const atBottom =
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= offset + 1) {
          current = id;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, offset]);

  return active;
};
