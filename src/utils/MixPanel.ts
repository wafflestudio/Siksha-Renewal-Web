import { AnalyticsEvent, AnalyticsEventMap, EventName } from "constants/track";
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

export const trackEvent = <T extends EventName>(event: {
  name: T;
  props: AnalyticsEventMap[T];
}) => {
  mixpanel.track(event.name, event.props);
};

export default mixpanel;
