"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    // Primary CTA color (#9f1b32) - Pret's signature red/maroon
    pretRed: [
      "#ffeef2", // 0: Very light red tint for backgrounds
      "#fad2de", // 1: Light red
      "#f4b5c8", // 2: Soft pink
      "#ed97b1", // 3: Light red
      "#e6799b", // 4: Medium light red
      "#de5b85", // 5: Medium red
      "#d23f6f", // 6: Red
      "#c62359", // 7: Deep red
      "#9f1b32", // 8: Primary CTA color (#9f1b32)
      "#801729", // 9: Darkest red
    ],

    // Neutral grays for text and backgrounds
    pretGray: [
      "#ffffff", // 0: Pure white background
      "#f8f8f8", // 1: Off-white
      "#f0f0f0", // 2: Very light gray
      "#e0e0e0", // 3: Light gray
      "#d0d0d0", // 4: Medium light gray
      "#b8b8b8", // 5: Medium gray
      "#a0a0a0", // 6: Gray
      "#808080", // 7: Medium dark gray
      "#606060", // 8: Dark gray
      "#000000", // 9: Pure black for primary text
    ],

    // Secondary green for accents (keeping some Pret heritage)
    pretGreen: [
      "#f0f8f0",
      "#d9ead9",
      "#b8d7b8",
      "#9ac89a",
      "#7eb97e",
      "#62aa62",
      "#5a9a5a",
      "#488a48",
      "#367a36",
      "#246a24",
    ],
  },

  // Set default color scheme
  colorScheme: "light",

  // Primary color for buttons, links, etc.
  primaryColor: "pretRed",

  // Default colors for common components
  defaultColor: "pretGray",

  // Background colors
  colorsScheme: {
    light: {
      // White background
      background: "#ffffff",
      // Light gray for secondary backgrounds
      secondaryBackground: "#f8f8f8",
    },
  },

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .1)",
    xl: "4px 4px 8px rgba(0, 0, 0, .15)",
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: "36px", fontWeight: 700, color: "pretGray.9" }, // Black text
      h2: { fontSize: "28px", fontWeight: 600, color: "pretGray.9" },
      h3: { fontSize: "24px", fontWeight: 600, color: "pretGray.9" },
    },
  },

  // Font colors
  fontColors: {
    // Primary text is black
    primary: "pretGray.9", // #000000
    // Secondary text is dark gray
    secondary: "pretGray.7", // #808080
    // Highlighted/important text is CTA red
    highlight: "pretRed.8", // #9f1b32
  },

  // Component defaults
  components: {
    Button: {
      defaultProps: {
        color: "pretRed", // CTAs use red
      },
    },
    Anchor: {
      defaultProps: {
        color: "pretRed.8", // Links use CTA red
      },
    },
    Badge: {
      defaultProps: {
        color: "pretRed", // Badges use red
      },
    },
  },
});
