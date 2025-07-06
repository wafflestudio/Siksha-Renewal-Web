// components/ClientMixpanelInitializer.tsx
"use client";

import { useEffect } from "react";
import { initMixpanel } from "utils/MixPanel";

export default function ClientMixpanelInitializer() {
  useEffect(() => {
    initMixpanel();
  }, []);

  return null;
}
