import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn("Mixpanel token is missing");
    return;
  }
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === "development",
  });
};

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    mixpanel.track(event, properties);
  }
};

export default mixpanel;
