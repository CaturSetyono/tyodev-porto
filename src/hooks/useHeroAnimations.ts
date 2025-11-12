import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface AnimationRefs {
  containerRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  descriptionRef: React.RefObject<HTMLParagraphElement | null>;
  buttonsRef: React.RefObject<HTMLDivElement | null>;
  socialRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLDivElement | null>;
  decorativeRefs: React.RefObject<HTMLDivElement[] | null>;
}

export function useHeroAnimations(mounted: boolean): AnimationRefs {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorativeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Timeline for sequential animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial states
    gsap.set(
      [
        titleRef.current,
        subtitleRef.current,
        descriptionRef.current,
        buttonsRef.current,
        socialRef.current,
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    gsap.set(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      rotation: -5,
    });

    // Animate elements in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.8"
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      )
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .to(
        socialRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      )
      .to(
        imageRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
        },
        "-=0.8"
      );

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [mounted]);

  return {
    containerRef,
    titleRef,
    subtitleRef,
    descriptionRef,
    buttonsRef,
    socialRef,
    imageRef,
    decorativeRefs,
  };
}
