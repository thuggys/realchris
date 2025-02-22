'use client';

import dynamic from 'next/dynamic';

const Snowfall = dynamic(() => import('react-snowfall'), { ssr: false });

export default function SnowEffect() {
  return (
    <Snowfall 
      color="white"
      snowflakeCount={200}
      radius={[0.5, 3.0]}
      speed={[0.5, 3.0]}
      wind={[-0.5, 2]}
    />
  );
} 