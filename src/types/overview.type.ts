interface Trend {
  direction: "no_change" | "up" | "down"; // Possible directions for the trend
  percent: number; // Percentage change from the previous month
  text: string; // Description of the trend
}

interface StatusData {
  count: number; // The count of items in that stage
  trend: Trend; // Trend information for that stage
}

interface IStatusOverview {
  pending: StatusData;
  inprogress: StatusData;
  completed: StatusData;
}

interface IMonthlyStats {
  month: number;
  inprogress: number;
  completed: number;
}

export type { IStatusOverview, IMonthlyStats };
