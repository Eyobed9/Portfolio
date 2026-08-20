import React, { useState, useRef, useEffect } from 'react';

const FadeIn = ({ children, delay = 0, duration = 500, threshold = 0.1 }: { 
  children: React.ReactNode; 
  delay?: number; 
  duration?: number; 
  threshold?: number 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [isVisible, threshold]);

    return (
        <div
            ref={elementRef}
            className={isVisible ? 'animate-fadeIn' : 'opacity-0'}
            style={{
                animationDelay: isVisible ? `${delay}ms` : '0ms',
                animationDuration: `${duration}ms`,
                animationFillMode: 'both',
            }}
        >
            {children}
        </div>
    );
};

export default FadeIn;