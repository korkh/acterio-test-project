import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleQueryChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleQueryChange);
    };
  }, [query]);

  return matches;
}
