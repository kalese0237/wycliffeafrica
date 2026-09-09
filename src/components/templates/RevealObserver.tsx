"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Drives every `.reveal` entrance on the site.
 *
 * One IntersectionObserver watches the whole document rather than each component owning its own, so
 * the cost is a single observer no matter how many things are marked. Elements are unobserved once
 * they have arrived — an entrance plays once, and a reader scrolling back up is not shown the page
 * assembling itself a second time.
 *
 * A MutationObserver picks up nodes that appear after the first pass: filtered directories, results
 * that arrive after a fetch, anything swapped in on the client.
 *
 * Elements already in the viewport on load are staggered by their document order so the first screen
 * arrives as a sequence rather than all at once; everything below the fold settles as it is reached.
 */
export function RevealObserver() {
  const pathname = usePathname();

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("reveal-is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-is-visible");
          observer.unobserve(entry.target);
        }
      },
      // A little inside the bottom edge, so an element starts moving as it comes up rather than
      // after it is already fully on screen.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    function register(element: Element, staggerFromLoad: boolean, index: number) {
      if (element.classList.contains("reveal-is-visible")) return;
      // The group stagger is set in CSS; this is for the first screen, which has no scroll to
      // separate its elements in time.
      if (staggerFromLoad && !(element as HTMLElement).style.getPropertyValue("--reveal-delay")) {
        (element as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(index, 6) * 80}ms`);
      }
      observer.observe(element);
    }

    const initial = Array.from(document.querySelectorAll(".reveal"));
    const viewportHeight = window.innerHeight;
    let aboveFold = 0;
    initial.forEach((element) => {
      const isOnFirstScreen = element.getBoundingClientRect().top < viewportHeight;
      register(element, isOnFirstScreen, isOnFirstScreen ? aboveFold++ : 0);
    });

    // Index the children of each `.reveal-group` so CSS can stagger them.
    document.querySelectorAll(".reveal-group").forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        (child as HTMLElement).style.setProperty("--reveal-index", String(index));
      });
    });

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains("reveal")) register(node, false, 0);
          node.querySelectorAll?.(".reveal").forEach((el) => register(el, false, 0));
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
