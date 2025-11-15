"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import Matter from 'matter-js';
import './FallingText.css';

interface FallingTextProps {
  className?: string;
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'auto' | 'hover' | 'click' | 'scroll';
  fontSize?: string;
  letterGap?: string;
  demoLink?: string;
}

const FallingText = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'click',
  fontSize = 'calc(2rem + 20px)',
  letterGap = '4px',
  demoLink = '/request-demo'
}: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [effectStarted, setEffectStarted] = useState(false);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const letterBodiesRef = useRef<Array<{ elem: HTMLElement; body: Matter.Body }>>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set up text as HORIZONTAL (normal reading)
  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(' ');
    const textHTML = words.map((word, wordIndex) => {
      const letters = word.split('').map((char, charIndex) => {
        const isHighlighted = highlightWords.some(hw => 
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return `<span class="letter-box ${isHighlighted ? highlightClass : ''}" data-word="${wordIndex}" data-char="${charIndex}">${char}</span>`;
      }).join('');
      
      const isDemo = word.toLowerCase().includes('demo');
      return `<span class="word-group" data-demo="${isDemo}">${letters}</span>`;
    }).join(' ');

    textRef.current.innerHTML = textHTML;
    
    // Set CSS variables
    if (textRef.current) {
      textRef.current.style.setProperty('--base-font-size', fontSize);
      textRef.current.style.setProperty('--letter-gap', letterGap);
    }

    // Make demo word clickable - store handlers for cleanup
    const handlers = new Map<HTMLElement, (e: Event) => void>();
    const demoWords = textRef.current.querySelectorAll('.word-group[data-demo="true"]');
    
    demoWords.forEach((word) => {
      const wordElement = word as HTMLElement;
      wordElement.style.cursor = 'pointer';
      
      const handleClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        if (!effectStarted) {
          setEffectStarted(true);
        }
      };
      
      handlers.set(wordElement, handleClick);
      wordElement.addEventListener('click', handleClick);
    });

    // Cleanup function
    return () => {
      handlers.forEach((handler, element) => {
        element.removeEventListener('click', handler);
      });
    };
  }, [text, highlightWords, highlightClass, fontSize, letterGap, effectStarted]);

  // Handle trigger modes
  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
    }
  }, [trigger]);

  // Reset function to restore animation to initial state
  const resetAnimation = useCallback(() => {
    if (!textRef.current) return;
    
    // Clear any existing reset timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    // Reset all letter positions to static
    const letterBoxes = textRef.current.querySelectorAll('.letter-box');
    letterBoxes.forEach((elem) => {
      const letterElem = elem as HTMLElement;
      letterElem.style.position = 'static';
      letterElem.style.left = '';
      letterElem.style.top = '';
      letterElem.style.transform = '';
      letterElem.style.pointerEvents = '';
      letterElem.style.visibility = '';
      letterElem.style.opacity = '';
      letterElem.style.zIndex = '';
    });

    // Reset demo word groups to be clickable
    const demoWords = textRef.current.querySelectorAll('.word-group[data-demo="true"]');
    demoWords.forEach((word) => {
      const wordElement = word as HTMLElement;
      wordElement.style.cursor = 'pointer';
      wordElement.style.pointerEvents = 'auto';
    });

    // Reset state - this will re-trigger the text setup useEffect
    setEffectStarted(false);
  }, []);

  // Matter.js physics - letters fall within the section, end just before CTA buttons
  useEffect(() => {
    if (!effectStarted || !containerRef.current || !canvasContainerRef.current || !textRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    // Get container dimensions - limit to container height
    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = 500; // Fixed height for the animation area
    
    // Floor positioned at the end of the section (before CTA buttons)
    const targetY = height - 80; // Floor at bottom of animation area

    // Create engine
    const engine = Engine.create();
    engine.world.gravity.y = 0.8; // Moderate gravity for controlled fall
    engineRef.current = engine;

    // Create renderer (hidden)
    const render = Render.create({
      element: canvasContainerRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio || 1
      }
    });
    renderRef.current = render;

    // Define collision categories
    const defaultCategory = 0x0001;
    const letterCategory = 0x0002;
    const boundaryCategory = 0x0004;

    // Create boundaries - floor at CTA button position
    const boundaryOptions = {
      isStatic: true,
      collisionFilter: {
        category: boundaryCategory,
        mask: defaultCategory | letterCategory
      },
      render: { 
        fillStyle: 'transparent',
        visible: false
      }
    };

    // Floor positioned at bottom of section (before CTA buttons)
    const floor = Bodies.rectangle(width / 2, targetY, width * 2, 100, boundaryOptions);
    
    // Narrower walls to keep letters more centered (60% of width)
    const wallInset = width * 0.2;
    const leftWall = Bodies.rectangle(wallInset, height / 2, 50, height * 2, boundaryOptions);
    const rightWall = Bodies.rectangle(width - wallInset, height / 2, 50, height * 2, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -50, width * 2, 100, boundaryOptions);

    Composite.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    // Get all letter boxes and create physics bodies
    const letterBoxes = textRef.current.querySelectorAll('.letter-box');
    if (letterBoxes.length === 0) return;

    const letterBodies: Array<{ elem: HTMLElement; body: Matter.Body }> = [];

    [...letterBoxes].forEach((elem, index) => {
      const letterElem = elem as HTMLElement;
      const rect = letterElem.getBoundingClientRect();
      const containerRect = containerRef.current!.getBoundingClientRect();
      
      // Get current position relative to container
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      const w = Math.max(rect.width, 20);
      const h = Math.max(rect.height, 25);

      // Check if this is the "demo" word to keep it prominent
      const isDemoWord = letterElem.classList.contains('highlighted');
      
      // Create physics body with collision filtering
      const body = Bodies.rectangle(x, y, w, h, {
        restitution: 0.2, // Less bounce for cleaner settling
        friction: 0.5, // More friction to reduce sliding
        frictionAir: 0.03, // More air resistance for faster settling
        density: 0.001, // Lighter for gentler fall
        collisionFilter: {
          category: letterCategory,
          mask: defaultCategory | letterCategory | boundaryCategory
        },
        render: {
          fillStyle: 'transparent',
          visible: false
        }
      });

      // Set initial styles
      letterElem.style.position = 'absolute';
      letterElem.style.left = `${x}px`;
      letterElem.style.top = `${y}px`;
      letterElem.style.transform = 'translate(-50%, -50%)';
      letterElem.style.zIndex = isDemoWord ? '150' : '100'; // Demo letters on top
      letterElem.style.visibility = 'visible';
      letterElem.style.opacity = '1';
      letterElem.style.pointerEvents = 'none'; // Don't block scroll events

      // Very minimal initial velocity for controlled fall
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 0.1, // Reduced horizontal spread
        y: Math.random() * 0.2 // Minimal vertical variance
      });

      letterBodies.push({ elem: letterElem, body });
      Composite.add(engine.world, body);
    });

    letterBodiesRef.current = letterBodies;

    // REMOVED: MouseConstraint was blocking page scroll
    // Letters will fall naturally without mouse interaction

    // Run engine
    const runner = Runner.create();
    Runner.run(runner, engine);
    runnerRef.current = runner;

    Render.run(render);

    // Update loop - sync DOM with physics
    let settledFrames = 0;
    const updateLoop = () => {
      let allSettled = true;
      
      letterBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        
        // Strict rotation limit for readability - keep letters mostly upright
        if (Math.abs(angle) > 0.15) {
          Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.5);
          Matter.Body.setAngle(body, angle * 0.95); // Gradually straighten
        }
        
        // Check if this body has settled
        const velocity = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
        const angularVelocity = Math.abs(body.angularVelocity);
        if (velocity > 0.3 || angularVelocity > 0.005) {
          allSettled = false;
        }
      });
      
      // If all letters have settled for 60 frames (1 second at 60fps), stop physics but keep letters visible
      if (allSettled) {
        settledFrames++;
        if (settledFrames > 60) {
          // Stop physics engine and canvas, but keep DOM elements in their final positions
          if (animationFrameIdRef.current !== null) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
          }
          if (runnerRef.current) {
            Runner.stop(runnerRef.current);
          }
          if (renderRef.current) {
            Render.stop(renderRef.current);
            if (renderRef.current.canvas && canvasContainerRef.current) {
              try {
                canvasContainerRef.current.removeChild(renderRef.current.canvas);
              } catch (e) {
                // Canvas already removed
              }
            }
          }
          
          // Start 15-second timer to reset animation
          resetTimeoutRef.current = setTimeout(() => {
            resetAnimation();
          }, 15000);
          
          return; // Exit the loop
        }
      } else {
        settledFrames = 0;
      }
      
      Matter.Engine.update(engine);
      animationFrameIdRef.current = requestAnimationFrame(updateLoop);
    };

    updateLoop();

    // Cleanup
    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
        runnerRef.current = null;
      }
      
      if (renderRef.current) {
        Render.stop(renderRef.current);
        if (renderRef.current.canvas && canvasContainerRef.current) {
          try {
            canvasContainerRef.current.removeChild(renderRef.current.canvas);
          } catch (e) {
            // Canvas already removed
          }
        }
        renderRef.current = null;
      }
      
      if (engineRef.current) {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
        engineRef.current = null;
      }
      
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      
      letterBodiesRef.current = [];
    };
  }, [effectStarted, resetAnimation]);

  const handleTrigger = () => {
    if (!effectStarted && trigger === 'hover') {
      setEffectStarted(true);
    }
  };

  // Cleanup reset timeout on component unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`falling-letters-container ${className}`}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden', // Contain animation within section
        height: '500px', // Fixed height
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '3rem 2rem',
        paddingBottom: '2rem',
        zIndex: 50,
        marginTop: '-50px', // Move up closer to AnimatedNumbers
        marginBottom: '2rem', // Space before CTA buttons
        pointerEvents: effectStarted ? 'none' : 'auto' // Allow scroll when animating
      }}
    >
      <div
        ref={textRef}
        className="falling-text-horizontal"
        style={{
          position: 'relative',
          zIndex: 51,
          fontSize: fontSize,
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '90%',
          visibility: effectStarted ? 'hidden' : 'visible'
        }}
      />
      <div 
        ref={canvasContainerRef} 
        className="falling-text-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
    </div>
  );
};

export default FallingText;
