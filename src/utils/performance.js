export function getTimeMetrics() {
  return {
    now: performance.now(),
    timeOrigin: performance.timeOrigin
  };
}