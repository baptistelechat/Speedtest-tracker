export interface ISpeedTestResult {
  result: {
    id: string;
  };
  ping: {
    latency: number;
  };
  download: {
    bytes: number;
    elapsed: number;
  };
  upload: {
    bytes: number;
    elapsed: number;
  };
}
