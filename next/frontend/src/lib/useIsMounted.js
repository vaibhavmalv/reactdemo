import { useEffect, useState } from 'react';

/**
 * useIsMounted
 * Returns true only after the component has mounted on the client.
 * Use this to avoid reading client-only sources (localStorage, window, sync Redux rehydration)
 * during render, which can cause SSR/CSR hydration mismatches.
 */
export default function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
