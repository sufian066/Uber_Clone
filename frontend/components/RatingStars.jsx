import React from 'react';

export default function RatingStars({ value = 0, max = 5 }) {
  return (
    <span>
      {[...Array(max)].map((_, i) =>
        i < value
          ? <span key={i} style={{color: '#FFD600'}}>★</span>
          : <span key={i} style={{color: '#ccc'}}>☆</span>
      )}
    </span>
  );
}
