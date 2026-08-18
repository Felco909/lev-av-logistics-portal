// Generates a curved SVG arc between two already-projected [x, y] pixel points, so corridor
// lines read as gentle geodesic-style curves rather than straight ruler lines.
export function generateCurvedPath(start: [number, number], end: [number, number]): string {
  const [x1, y1] = start;
  const [x2, y2] = end;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 1) return `M ${x1} ${y1} L ${x2} ${y2}`;

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const curvature = Math.min(0.25, Math.max(0.08, dist / 1200));
  const cx = midX - dy * curvature;
  const cy = midY + dx * curvature;

  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}
