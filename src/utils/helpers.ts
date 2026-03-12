import { useEffect, useState } from "react";
import { notifySuccess, notifyError } from "../solana/context/Notifications";

// Share function
export const shareContent = (): void => {
  if (navigator.share) {
    navigator
      .share({
        title: "MemeRadar",
        text: "Become a MemeRadar DBO and be part of a transformative ecosystem...",
        url: "https://www.memeradar.com",
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.log("Error sharing:", error));
  } else {
    alert("Sharing not supported on this browser");
  }
};

// React countdown hook
export const useCountdown = (
  durationSeconds: number,
  onEnd?: () => void
): string => {
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onEnd) onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onEnd]);

  const hours = Math.floor(timeLeft / 3600)
    .toString()
    .padStart(2, "0");

  const minutes = Math.floor((timeLeft % 3600) / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

// Vanilla JS timer (DOM based)
export const startTimer = (
  durationSeconds: number,
  displayId: string,
  boxId: string
): void => {
  let timeLeft: number = durationSeconds;

  const display = document.getElementById(displayId);
  const box = document.getElementById(boxId);

  if (!display || !box) return;

  (box as HTMLElement).style.display = "block";

  const interval = setInterval(() => {
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      (box as HTMLElement).style.display = "none";
    }

    timeLeft--;
  }, 1000);
};

// Legacy countdown hook
export const useLegacyCountdown = (): {
  countdown: string;
  countdown1: string;
} => {
  const [countdown, setCountdown] = useState<string>("");
  const [countdown1, setCountdown1] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();

      let hours = 34 - d.getHours();
      let min: number | string = 60 - d.getMinutes();
      let sec: number | string = 60 - d.getSeconds();

      if (Number(min) < 10) min = "0" + min;
      if (Number(sec) < 10) sec = "0" + sec;

      setCountdown(`${hours}:${min}:${sec}`);

      let hours1 = 34 - d.getHours();
      let min1: number | string = 60 - d.getMinutes();
      let sec1: number | string = 60 - d.getSeconds();

      if (Number(min1) < 10) min1 = "0" + min1;
      if (Number(sec1) < 10) sec1 = "0" + sec1;

      setCountdown1(`${hours1}:${min1}:${sec1}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { countdown, countdown1 };
};

export const copyToClipboard = async (
  text: string,
  successMessage: string = "Copied to clipboard"
) => {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    notifySuccess(successMessage);
  } catch (err) {
    notifyError("Copy failed");
    console.error("Copy failed", err);
  }
};