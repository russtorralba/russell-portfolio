import { useEffect, useState } from "react";

export default function ClientAnalytics() {
  const [Analytics, setAnalytics] = useState(null);

  useEffect(() => {
    let isMounted = true;

    import("@vercel/analytics/react").then(({ Analytics: AnalyticsComponent }) => {
      if (isMounted) setAnalytics(() => AnalyticsComponent);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return Analytics ? <Analytics /> : null;
}
