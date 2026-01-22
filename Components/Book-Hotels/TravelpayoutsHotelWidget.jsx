"use client";

import React, { useEffect, useMemo, useRef } from "react";

function buildTravelpayoutsContentUrl(params) {
  const url = new URL("https://tpwgt.com/content");
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    url.searchParams.set(key, String(value));
  });
  return url.toString();
}

export default function TravelpayoutsHotelWidget({
  title = "Find hotel deals",
  subtitle = "Compare prices across trusted booking sites.",
  className = "",
  params,
}) {
  const mountRef = useRef(null);

  const src = useMemo(() => {
    const defaultParams = {
      trs: 404603,
      shmarker: 620562,
      locale: "en",
      hotel_type: 234,
      sustainable: true,
      deals: true,
      border_radius: 10,
      plain: true,
      powered_by: false,
      promo_id: 2693,
      campaign_id: 84,
    };

    return buildTravelpayoutsContentUrl({ ...defaultParams, ...(params || {}) });
  }, [params]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Ensure we don't duplicate widgets on re-renders/hot reload.
    mountRef.current.replaceChildren();

    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.charset = "utf-8";

    mountRef.current.appendChild(script);

    return () => {
      // Best-effort cleanup
      if (mountRef.current) mountRef.current.replaceChildren();
    };
  }, [src]);

  return (
    <section
      className={`tpwgt-section padding_top padding_bottom ${className}`.trim()}
    >
      <div className="container">
        <div className="tpwgt-card">
          <div className="tpwgt-head">
            <h3 className="tpwgt-title">{title}</h3>
            {subtitle ? <p className="tpwgt-subtitle">{subtitle}</p> : null}
          </div>
          <div ref={mountRef} className="tpwgt-mount" />
        </div>
      </div>
    </section>
  );
}


