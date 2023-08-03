require("dotenv/config");

module.exports = {
  expo: {
    name: "FGSEVER",
    slug: "fgsever-mobile-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      softwareKeyboardLayoutMode: "pan",
      package: "com.fgsever.mobileapp",
      googleServicesFile: "./google-services.json",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "145aff63-6376-4a2b-a72f-35ecaa4d94fa",
      },
      apiUrl: process.env.API_URL,
      odataApiUrl: process.env.ODATA_API_URL,
    },
  },
};
