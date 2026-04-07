import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroOverlay = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
        // Start playing silently (This is required for autoplay to work)
        videoRef.current.muted = true;
        videoRef.current.play();
        console.log("Autoplay muted started");
    }

    // THE HIDDEN HACK: Any interaction anywhere unmutes the video!
    // This removes all UI buttons while respecting browser security.
    const handleInteraction = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        console.log("Unmuted via user interaction");
      }
    };

    window.addEventListener('mousedown', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const handleEnded = () => {
    setIsFading(true);
    setTimeout(onComplete, 1000);
  };

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div 
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            onEnded={handleEnded}
            className="intro-video"
            onClick={() => {
              // Ensure clicking the video specifically also unmutes
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.volume = 1.0;
              }
            }}
          >
            <source src="/logo_Reveal.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <style>{`
            .intro-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: #000;
              z-index: 10000;
              overflow: hidden;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .intro-video {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
