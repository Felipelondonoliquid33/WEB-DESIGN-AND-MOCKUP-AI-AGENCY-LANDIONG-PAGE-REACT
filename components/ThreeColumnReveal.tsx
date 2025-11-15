"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ui/ThreeColumnReveal.css';

// Register GSAP plugin
if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const data = [
  {
    title: 'Plan Sitemaps',
    desc: 'Quickly map out your website pages with an AI-generated sitemap.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop',
  },
  {
    title: 'Structure Wireframes',
    desc: 'Effortlessly structure your pages and copy with distraction-free wireframes.',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
  },
  {
    title: 'Conceptualise Style Guide',
    desc: 'Instantly create design concepts and apply the winning style across pages.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
  },
];

export default function ThreeColumnReveal() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;
      const image = section.querySelector('.box-image');
      gsap.fromTo(
        image,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 30%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="three-column-grid">
      {data.map((item, idx) => (
        <div
          className="column-card"
          key={item.title}
          ref={el => { sectionsRef.current[idx] = el; }}
        >
          <div className="card-text">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
          <img className="box-image" src={item.img} alt={item.title} />
        </div>
      ))}
    </div>
  );
}
