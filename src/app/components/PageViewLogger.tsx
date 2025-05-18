"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logEvent } from "firebase/analytics";
import { analytics } from "utils/api/firebase";

interface PageViewLoggerProps {
    children: React.ReactNode;
}

export default function PageViewLogger({ children }: PageViewLoggerProps) {
    const pathname = usePathname();

    useEffect(() => {
        if (analytics) {
            logEvent(analytics, "page_view", {
                page_path: pathname,
            });
        }
    }, [pathname]);

    return <>{children}</>;
}