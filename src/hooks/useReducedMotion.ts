import { useEffect, useState } from 'react';

// Combines the user's explicit OS-level motion preference with a lightweight device-capability
// heuristic (CPU core count) so heavy SVG/SMIL animation is automatically dialed back on both
// accessibility grounds and on low-power hardware, per the performance requirements of the map.
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const lowPowerDevice =
      typeof navigator !== 'undefined' &&
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency > 0 &&
      navigator.hardwareConcurrency <= 4;
    return prefersReduced || lowPowerDevice;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduced(mq.matches || navigator.hardwareConcurrency <= 4);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return reduced;
}
