import { TrendStatus } from '@/types';

export interface ScoreHistoryPoint {
  date: Date | string;
  score: number;
  maxMarks: number;
  percentage: number;
  examName: string;
}

export interface TrendAnalysisResult {
  status: TrendStatus;
  delta: number;
  percentageChange: number;
  latestScore: number;
  previousScore?: number;
  trajectory: number[];
  explanation: string;
}

/**
 * Reusable transparent academic trend algorithm
 * Uses chronological assessment records to determine genuine academic progress.
 */
export function calculateAcademicTrend(history: ScoreHistoryPoint[]): TrendAnalysisResult {
  if (!history || history.length < 2) {
    const single = history && history.length === 1 ? history[0].percentage : 0;
    return {
      status: 'INSUFFICIENT_DATA',
      delta: 0,
      percentageChange: 0,
      latestScore: single,
      trajectory: history ? history.map((h) => h.percentage) : [],
      explanation: 'Insufficient assessment history to compute statistical trend (minimum 2 cycles required).',
    };
  }

  // Ensure chronological order
  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const current = sorted[sorted.length - 1].percentage;
  const previous = sorted[sorted.length - 2].percentage;
  const delta = Math.round((current - previous) * 10) / 10;

  let percentageChange = 0;
  if (previous > 0) {
    percentageChange = Math.round(((current - previous) / previous) * 1000) / 10;
  }

  let status: TrendStatus = 'STABLE';
  let explanation = `Performance remained stable within normal variance (${delta >= 0 ? '+' : ''}${delta}%).`;

  if (delta >= 3.0) {
    status = 'IMPROVING';
    explanation = `Positive upward trajectory of +${delta} percentage points across recent examinations.`;
  } else if (delta <= -3.0) {
    status = 'DECLINING';
    explanation = `Score decreased by ${Math.abs(delta)} percentage points; recommend focused academic practice.`;
  }

  return {
    status,
    delta,
    percentageChange,
    latestScore: current,
    previousScore: previous,
    trajectory: sorted.map((h) => h.percentage),
    explanation,
  };
}
