"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
      raf = requestAnimationFrame(animateGlow);
    };
    animateGlow();

    const addHover = () => {
      cursor.classList.add("cursor-hover");
      glow.classList.add("cursor-hover");
    };
    const removeHover = () => {
      cursor.classList.remove("cursor-hover");
      glow.classList.remove("cursor-hover");
    };

    document.addEventListener("mousemove", onMove);

    const attachHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };
    attachHoverListeners();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}
