"use client";

import React, { useState, useEffect, useCallback } from "react";

interface DiscountModalProps {
  discountPercentage?: number;
  couponCode?: string;
  ctaUrl?: string;
  scrollThreshold?: number;
  storageKey?: string;
  /** Set to true during development so it pops up on every page refresh */
  debugMode?: boolean;
}

export const DiscountModal: React.FC<DiscountModalProps> = ({
  discountPercentage = 40,
  couponCode = "TECH40OFF",
  ctaUrl = "/courses",
  scrollThreshold = 45,
  storageKey = "tech_course_discount_modal_dismissed",
  debugMode = false, // Toggle to true while testing
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    // Skip localstorage check if debug mode is on
    if (!debugMode && localStorage.getItem(storageKey)) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (scrollHeight <= 0) return;

    const currentScrollPercentage = (scrollTop / scrollHeight) * 100;

    if (currentScrollPercentage >= scrollThreshold) {
      setIsOpen(true);
      window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollThreshold, storageKey, debugMode]);

  useEffect(() => {
    // Clear storage on mount if debugging
    if (debugMode) {
      localStorage.removeItem(storageKey);
    }

    const isDismissed = localStorage.getItem(storageKey);
    if (!isDismissed || debugMode) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, storageKey, debugMode]);

  // Lock background body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (!debugMode) {
      localStorage.setItem(storageKey, "true");
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-900 dark:ring-slate-800 z-10">
        {/* Top Gradient */}
        <div className="h-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          aria-label="Close modal"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Body */}
        <div className="p-6 sm:p-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
            End of the year discount 
          </div>

          <h2
            id="modal-title"
            className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Unlock{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {discountPercentage}% OFF
            </span>{" "}
            All Tech Courses
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Level up your career with industry-standard development and
            architecture courses.
          </p>

          {/* Coupon Box */}
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3.5 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Promo Code
              </span>
              <p className="font-mono text-base font-bold text-slate-800 dark:text-slate-100">
                {couponCode}
              </p>
            </div>
            <button
              onClick={handleCopyCode}
              type="button"
              className="rounded-lg bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700"
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a
              href={ctaUrl}
              onClick={handleClose}
              className="w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500"
            >
              Claim 40% Discount
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
