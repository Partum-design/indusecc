'use client';
import Image, { type StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { Icon } from '../ui/Icon';

/** Loads YouTube only after a click (privacy-friendly and fast). Picks the vertical cut on phones. */
export function VideoFacade({ desktopId, mobileId, poster, title }: { desktopId: string; mobileId?: string; poster: StaticImageData; title: string }) {
  const [play, setPlay] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(max-width: 640px)');
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const id = mobile && mobileId ? mobileId : desktopId;
  return (
    <div className={`video ${mobile && mobileId ? 'vertical' : ''}`}>
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video-poster" onClick={() => setPlay(true)} aria-label={`Reproducir: ${title}`}>
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" />
          <span className="video-play"><Icon name="video" /></span>
          <span className="video-label">Ver video del curso</span>
        </button>
      )}
    </div>
  );
}
