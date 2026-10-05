import React, { useId } from 'react';
import { practiceArt } from './curriculum/practice/art.js';

/** Display one cell of the original image without duplicating or recompressing the artwork. */
export default function Illustration({ image, alt = '', className = '' }) {
  const clipId = useId();
  const art = practiceArt[image];
  if (!art) return <img className={className} src={`/images/${image}.svg`} alt={alt} />;
  const [left, top, width, height] = art.bounds || [art.column * 100 / art.columns, art.row * 100 / art.rows, 100 / art.columns, 100 / art.rows];
  const aspect = art.aspect || 1;
  const viewHeight = height / aspect;
  return <svg className={`vocabulary-illustration ${className}`} viewBox={`0 0 ${width} ${viewHeight}`}
    role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} focusable="false">
    <defs><clipPath id={clipId}><rect width={width} height={viewHeight} /></clipPath></defs>
    <g clipPath={`url(#${clipId})`}>
      <rect width={width} height={viewHeight} fill="#f1ede4" />
      <image href={art.file} x={-left} y={-top / aspect} width="100" height={100 / aspect} />
    </g>
  </svg>;
}
