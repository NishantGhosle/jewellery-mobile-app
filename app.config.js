import 'dotenv/config';  

const apiURL = process.env.API_URL;
const sheetURL = process.env.SHEET_URL;
const noURL = process.env.WHATSAPP_NO;

export default {
  name: "Rohit Jewellers",
  slug: "snack-3849a245-f115-4e4f-94cf-ab371c3f39b5",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.nishantghosle.snack3849a245f1154e4f94cfab371c3f39b5"
  },
  android: {
    permissions: ["INTERNET"],
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.nishantghosle.snack3849a245f1154e4f94cfab371c3f39b5",
    versionCode: 1
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    API_URL: apiURL, 
    SHEET_URL: sheetURL, 
    WHATSAPP_NO: noURL, 
    eas: {
      projectId: "897f33b5-a329-48e4-a404-dccf39b5595e"
    }
  }
};
