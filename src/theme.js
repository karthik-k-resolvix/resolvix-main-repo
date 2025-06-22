import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    bgPrimary: "#0F112B",
    bgSecondary: "#1A1C3A",
    buttonPrimary: "#417BDE",
    buttonSecondary: "#5EB9F0",
    error: "#FF5E4D",
    warning: "#FFD233",
    textPrimary: "#F2F2F2",
    textSecondary: "#A3DDFD",
    aiLayer: "#5C64EC",
    gradientOverlay: "#6A3BA0",
    ctaOnboarding: "#FFB087",
    edgeLines: "#000000"
  },
};

const theme = extendTheme({ colors });

export default theme;
