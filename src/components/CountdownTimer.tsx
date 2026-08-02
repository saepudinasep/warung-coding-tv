'use client';

import { useEffect, useState } from 'react';

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ eventDate }: { eventDate: string }) {
  const target = new Date(eventDate);
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(() =>
    getTimeLeft(target),
  );

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(new Date(eventDate))), 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  if (!timeLeft) return null;

  const items = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="invite-countdown">
      {items.map((item) => (
        <div className="invite-countdown-item" key={item.label}>
          <div className="invite-countdown-num">{String(item.value).padStart(2, '0')}</div>
          <div className="invite-countdown-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
