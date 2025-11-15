"use client";

import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }: { children: React.ReactNode; itemClassName?: string }) => (
  <div className="scroll-stack-card-wrapper">
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
  </div>
);

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value.toString());
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) {
        return {
          scrollTop: 0,
          containerHeight: 0,
          scrollContainer: document.documentElement
        };
      }
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement as HTMLElement) : 0;

    // Batch DOM reads and writes separately to avoid layout thrashing
    const cardData = cardsRef.current.map((card, i) => {
      if (!card) return null;
      return {
        card,
        index: i,
        cardTop: getElementOffset(card)
      };
    })
      .filter((t): t is {
        card: HTMLDivElement;
        index: number;
        cardTop: number;
      } => t !== null);

    // Now perform all calculations
    const transforms = cardData.map((data) => {
      if (!data) return null;
      const { card, index: i, cardTop } = data;

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardData.length; j++) {
          const jData = cardData[j];
          if (!jData) continue;
          const jTriggerStart = jData.cardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      // No manual translateY needed - sticky positioning handles stacking
      return {
        card,
        index: i,
        newTransform: {
          translateY: 0,  // Let CSS sticky handle vertical positioning
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 10) / 10,
          blur: Math.round(blur * 10) / 10
        },
        pinStart,
        pinEnd
      };
    })
      .filter((t): t is {
        card: HTMLDivElement;
        index: number;
        newTransform: { translateY: number; scale: number; rotation: number; blur: number; };
        pinStart: number;
        pinEnd: number;
      } => t !== null);

    // Now apply all transforms in a single batch
    (transforms as Array<{
      card: HTMLDivElement;
      index: number;
      newTransform: { translateY: number; scale: number; rotation: number; blur: number; };
      pinStart: number;
      pinEnd: number;
    }>).forEach(({ card, index: i, newTransform, pinStart, pinEnd }) => {
      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.005 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.5 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.5;

      if (hasChanged) {
        // Only apply scale and rotation - CSS sticky handles positioning
        const transform = `scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : 'none';

        card.style.transform = transform;
        card.style.filter = filter;
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const rafIdRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    // Use RAF to throttle updates and ensure smooth performance
    if (rafIdRef.current !== null) {
      return; // Skip if update is already scheduled
    }
    
    rafIdRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
      rafIdRef.current = null;
    });
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.15,
        syncTouch: true,
        syncTouchLerp: 0.1
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };

      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;

      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const inner = scroller.querySelector('.scroll-stack-inner') as HTMLElement;
      if (!inner) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: inner,
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.15,
        syncTouch: true,
        syncTouchLerp: 0.1
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };

      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;

      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    // For window scroll, we need to wait a bit for the DOM to be ready
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    let timeoutId: NodeJS.Timeout | null = null;

    // Use a small timeout to ensure DOM is ready for window scroll
    const initScrollStack = () => {
      const cards = Array.from(
        useWindowScroll
          ? document.querySelectorAll('.scroll-stack-card')
          : (scroller?.querySelectorAll('.scroll-stack-card') || [])
      ) as HTMLDivElement[];

      if (cards.length === 0) return;

      cardsRef.current = cards;

      cards.forEach((card, i) => {
        // Don't add vertical spacing - cards should stack on top of each other
        card.style.marginBottom = '0';
        
        // Set z-index so cards stack in correct order
        card.style.zIndex = String(cards.length - i);

        card.style.willChange = 'transform';
        card.style.transformOrigin = 'top center';
        card.style.backfaceVisibility = 'hidden';
        card.style.transform = 'scale(1)';
      });

      setupLenis();
      updateCardTransforms();
    };

    // Delay initialization for window scroll to ensure DOM is ready
    if (useWindowScroll) {
      timeoutId = setTimeout(initScrollStack, 100);
    } else {
      initScrollStack();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);

  if (useWindowScroll) {
    return (
      <div className={`scroll-stack-inner ${className}`.trim()}>
        {children}
        <div className="scroll-stack-end" />
      </div>
    );
  }

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;

