import { gsap } from "gsap";

// Note: ScrollTrigger is a premium GSAP plugin
// For basic animations, we'll use Framer Motion's scroll animations instead
// If you have GSAP Club GreenSock membership, uncomment below:
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// Basic GSAP animations (without ScrollTrigger)
// For scroll-triggered animations, we use Framer Motion's useScroll and useInView hooks

export const fadeInAnimation = (
  element: string | Element,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
  }
) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: options?.y || 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration || 0.8,
      delay: options?.delay || 0,
      ease: "power3.out",
    }
  );
};

export const staggerAnimation = (
  elements: string | Element[],
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
  }
) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration || 0.6,
      delay: options?.delay || 0,
      stagger: options?.stagger || 0.1,
      ease: "power3.out",
    }
  );
};

export const scaleAnimation = (
  element: string | Element,
  options?: {
    startScale?: number;
    endScale?: number;
    duration?: number;
  }
) => {
  return gsap.fromTo(
    element,
    {
      scale: options?.startScale || 0.8,
    },
    {
      scale: options?.endScale || 1,
      duration: options?.duration || 0.6,
      ease: "power3.out",
    }
  );
};

