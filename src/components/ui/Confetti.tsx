"use client";

import confetti from "canvas-confetti";

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#8B5CF6", "#22D3EE", "#6366F1", "#10B981", "#F59E0B"],
      disableForReducedMotion: true,
    });
  } catch (e) {
    // Graceful fallback if canvas is unavailable
  }
}

export function triggerFireworkConfetti() {
  try {
    const end = Date.now() + 1000;
    const colors = ["#8B5CF6", "#22D3EE", "#F59E0B"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {
    // Fallback
  }
}
