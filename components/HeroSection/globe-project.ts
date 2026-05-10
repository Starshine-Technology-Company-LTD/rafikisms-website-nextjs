/** Round so Node + browser produce identical SVG numbers (avoids hydration mismatch). */
export function snapCoord(n: number, precision = 4): number {
  const f = 10 ** precision;
  return Math.round(n * f) / f;
}

/** Simple orthographic-style projection onto the hero SVG disc (cx, cy, radius r). */
export function projectGlobe(
  lat: number,
  lon: number,
  r = 180,
  cx = 200,
  cy = 200
): { x: number; y: number } {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  const x = cx + r * Math.cos(latRad) * Math.sin(lonRad);
  const y = cy - r * Math.sin(latRad);
  return { x: snapCoord(x), y: snapCoord(y) };
}
