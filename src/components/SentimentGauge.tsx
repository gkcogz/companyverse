// src/components/SentimentGauge.tsx
'use client';

type SentimentGaugeProps = {
  score: number; // 0-100 arası bir değer
};

const SentimentGauge = ({ score }: SentimentGaugeProps) => {
  const rotation = (score / 100) * 180 - 90;

  let textColor = 'text-yellow-500';
  let label = 'Okay';
  if (score >= 75) {
    textColor = 'text-green-500';
    label = 'Great';
  } else if (score >= 60) {
    textColor = 'text-emerald-500';
    label = 'Good';
  } else if (score < 40) {
    textColor = 'text-red-500';
    label = 'Poor';
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-40 h-20"> {/* Boyut biraz küçültüldü */}
      <svg className="absolute top-0 w-full h-full" viewBox="0 0 100 50">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          stroke="#e5e7eb" strokeWidth="12" fill="none" strokeLinecap="round"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          stroke="url(#gaugeGradient)" strokeWidth="12" fill="none" strokeLinecap="round"
          style={{
            strokeDasharray: 125.6,
            strokeDashoffset: 125.6 * (1 - score / 100),
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>

      <div
        className="absolute bottom-0 w-1 h-10 bg-gray-700 rounded-t-full origin-bottom"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      />
      <div className="absolute bottom-0 w-3 h-3 bg-gray-700 rounded-full" />

      {/* DÜZELTME: Metnin konumunu dikeyde ortalayıp biraz yukarı çektik */}
      <div className="absolute top-1/2 text-center transform -translate-y-1">
        <span className={`text-xl font-bold ${textColor}`}>
          {score.toFixed(0)}
        </span>
        <p className="text-xs font-semibold text-gray-500 -mt-1">{label}</p>
      </div>
    </div>
  );
};

export default SentimentGauge;