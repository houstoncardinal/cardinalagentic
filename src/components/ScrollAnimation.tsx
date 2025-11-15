import { useEffect, useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollAnimation = ({ children, className = "", delay = 0 }: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-700 ${className}`}>
      {children}
    </div>
  );
};

export default ScrollAnimation;
