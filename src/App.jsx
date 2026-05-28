
import { useState } from "react";

const campaigns = [
  {
    id: 1,
    name: "IND_LinkedIn_Payroll_MOFU_Q3_2026",
    channel: "LinkedIn",
    product: "Payroll",
    spend: 142000,
    budget: 200000,
    impressions: 84200,
    clicks: 1263,
    ctr: 1.5,
    leads: 38,
    mqls: 11,
    sqls: 4,
    cpl: 3737,
    sqlRate: 36,
    pipeline: 2800000,
    status: "scale",
    trend: "up",
    aiFlag: null,
  },
  {
    id: 2,
    name: "IND_Google_CoreHR_BOFU_Q3_2026",
    channel: "Paid Search",
    product: "Core HR",
    spend: 98000,
    budget: 120000,
    impressions: 52100,
    clicks: 930,
    ctr: 1.79,
    leads: 21,
    mqls: 5,
    sqls: 1,
    cpl: 4667,
    sqlRate: 20,
    pipeline: 600000,
    status: "review",
    trend: "down",
    aiFlag: "CPL 2.1x benchmark. SQL rate declining. Creative refresh recommended.",
  },
  {
    id: 3,
    name: "MENA_LinkedIn_Talent_TOFU_Q3_2026",
    channel: "LinkedIn",
    product: "Talent",
    spend: 61000,
    budget: 80000,
    impressions: 41800,
    clicks: 376,
    ctr: 0.9,
    leads: 9,
    mqls: 1,
    sqls: 0,
    cpl: 6778,
    sqlRate: 11,
    pipeline: 0,
    status: "pause",
    trend: "down",
    aiFlag: "PAUSED by agent — CPL 3.1x benchmark, 0 SQLs in 14 days. Budget reallocated to campaign #1.",
  },
  {
    id: 4,
    name: "IND_Meta_Payroll_TOFU_Q3_2026",
    channel: "Meta",
    product: "Payroll",
    spend: 34000,
    budget: 60000,
    impressions: 128000,
    clicks: 1152,
    ctr: 0.9,
    leads: 14,
    mqls: 2,
    sqls: 0,
    cpl: 2429,
    sqlRate: 14,
    pipeline: 0,
    status: "optimize",
    trend: "flat",
    aiFlag: "Low CTR (0.9%). High reach, poor engagement. 3 creative variants generated.",
  },
  {
    id: 5,
    name: "IND_Email_AIHR_Nurture_Q3_2026",
    channel: "Email",
    product: "AI HR",
    spend: 8000,
    budget: 10000,
    impressions: 12400,
    clicks: 620,
    ctr: 5.0,
    leads: 18,
    mqls: 7,
    sqls: 3,
    cpl: 444,
    sqlRate: 43,
    pipeline: 1800000,
    status: "scale",
    trend: "up",
    aiFlag: null,
  },
];

const creativeVariants = [
  {
    campaign: "IND_Meta_Payroll_TOFU_Q3_2026",
    variants: [
      {
        id: "V1",
        headline: "Still Running Payroll on Spreadsheets?",
        body: "PeopleStrong automates payroll for 500+ employee enterprises — zero errors, full compliance. See how Tata Motors saved 40 hrs/month.",
        cta: "Book a Demo",
        angle: "Pain-led",
      },
      {
        id: "V2",
        headline: "Payroll That Runs Itself",
        body: "Auto-calculate. Auto-comply. Auto-disburse. PeopleStrong Payroll handles India's most complex payroll scenarios — built for enterprise scale.",
        cta: "See It in Action",
        angle: "Product-led",
      },
      {
        id: "V3",
        headline: "Your Competitors Already Automated Payroll",
        body: "82% of fast-growing Indian enterprises moved to cloud payroll in 2025. Don't let manual processes slow your HR team down.",
        cta: "Get Started Free",
        angle: "Social proof",
      },
    ],
  },
];

const dailyDigest = {
  date: "28 May 2026",
  totalSpend: 343000,
  totalBudget: 470000,
  weeklyLeads: 100,
  weeklyMQLs: 26,
  weeklySQLs: 8,
  weeklyPipeline: 5200000,
  actions: [
    { type: "pause", text: "Paused MENA_LinkedIn_Talent — 0 SQLs / 14 days, CPL 3.1x benchmark" },
    { type: "reallocate", text: "Reallocated ₹19,000 from MENA_LinkedIn_Talent → IND_LinkedIn_Payroll" },
    { type: "creative", text: "3 creative variants generated for IND_Meta_Payroll low CTR" },
    { type: "alert", text: "IND_Google_CoreHR CPL trending up — review recommended by Friday" },
  ],
};

const statusConfig = {
  scale: { label: "SCALE", color: "#00d4aa", bg: "rgba(0,212,170,0.12)" },
  optimize: { label: "OPTIMIZE", color: "#f5a623", bg: "rgba(245,166,35,0.12)" },
  review: { label: "REVIEW", color: "#ff6b35", bg: "rgba(255,107,53,0.12)" },
  pause: { label: "PAUSED", color: "#ff3b5c", bg: "rgba(255,59,92,0.12)" },
};

const fmtINR = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : `₹${n.toLocaleString("en-IN")}`;

export default function App() {
  const [activeTab, setActiveTab] = useState("digest");
  const [expandedCampaign, setExpandedCampaign] = useState(null);
  const [showCreative, setShowCreative] = useState(false);

  return (
    <div style={{
      fontFamily: "'DM Mono', 'Courier New', monospace",
      background: "#0a0d12",
      color: "#e2e8f0",
      minHeight: "100vh",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0d12; }
        ::-webkit-scrollbar-thumb { background: #2d3748; border-radius: 2px; }
        .tab-btn { background: none; border: none; cursor: pointer; transition: all 0.2s; }
        .tab-btn:hover { opacity: 0.8; }
        .row-hover:hover { background: rgba(255,255,255,0.03) !important; cursor: pointer; }
        .action-item { animation: fadeIn 0.4s ease forwards; opacity: 0; }
        .action-item:nth-child(1) { animation-delay: 0.1s; }
        .action-item:nth-child(2) { animation-delay: 0.2s; }
        .action-item:nth-child(3) { animation-delay: 0.3s; }
        .action-item:nth-child(4) { animation-delay: 0.4s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .variant-card { transition: all 0.2s; }
        .variant-card:hover { border-color: #00d4aa !important; transform: translateY(-2px); }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1a2030",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#0d1117",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: "linear-gradient(135deg, #00d4aa, #0084ff)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "700",
          }}>P</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: "700", letterSpacing: "0.02em", color: "#fff" }}>
              PeopleStrong Campaign Intelligence Agent
            </div>
            <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.08em", marginTop: "1px" }}>
              POWERED BY CLAUDE · LINKEDIN · META · HUBSPOT
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div className="pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00d4aa" }} />
            <span style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.06em" }}>LIVE · Last sync 4 min ago</span>
          </div>
          <div style={{ fontSize: "11px", color: "#4a5568" }}>{dailyDigest.date}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #1a2030", padding: "0 32px", background: "#0d1117", display: "flex", gap: "0" }}>
        {[
          { id: "digest", label: "DAILY DIGEST" },
          { id: "campaigns", label: "CAMPAIGNS" },
          { id: "creative", label: "CREATIVE LAB" },
          { id: "routing", label: "FLOW" },
        ].map((t) => (
          <button
            key={t.id}
            className="tab-btn"
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "12px 20px",
              fontSize: "10px",
              letterSpacing: "0.1em",
              fontFamily: "'DM Mono', monospace",
              color: activeTab === t.id ? "#00d4aa" : "#4a5568",
              borderBottom: activeTab === t.id ? "2px solid #00d4aa" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* DAILY DIGEST TAB */}
        {activeTab === "digest" && (
          <div>
            {/* KPI Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "24px" }}>
              {[
                { label: "TOTAL SPEND", value: fmtINR(dailyDigest.totalSpend), sub: `of ${fmtINR(dailyDigest.totalBudget)} budget`, color: "#e2e8f0" },
                { label: "LEADS (7D)", value: dailyDigest.weeklyLeads, sub: "across all channels", color: "#e2e8f0" },
                { label: "MQLS (7D)", value: dailyDigest.weeklyMQLs, sub: `${((dailyDigest.weeklyMQLs / dailyDigest.weeklyLeads) * 100).toFixed(0)}% MQL rate`, color: "#0084ff" },
                { label: "SQLS (7D)", value: dailyDigest.weeklySQLs, sub: `${((dailyDigest.weeklySQLs / dailyDigest.weeklyMQLs) * 100).toFixed(0)}% SQL rate`, color: "#00d4aa" },
                { label: "PIPELINE (7D)", value: fmtINR(dailyDigest.weeklyPipeline), sub: "influenced (W-shaped)", color: "#f5a623" },
              ].map((k, i) => (
                <div key={i} style={{
                  background: "#0d1117",
                  border: "1px solid #1a2030",
                  borderRadius: "8px",
                  padding: "16px",
                }}>
                  <div style={{ fontSize: "9px", color: "#4a5568", letterSpacing: "0.1em", marginBottom: "8px" }}>{k.label}</div>
                  <div style={{ fontSize: "22px", fontFamily: "'Syne', sans-serif", fontWeight: "700", color: k.color }}>{k.value}</div>
                  <div style={{ fontSize: "10px", color: "#4a5568", marginTop: "4px" }}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Actions + Budget */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {/* Agent Actions */}
              <div style={{ background: "#0d1117", border: "1px solid #1a2030", borderRadius: "8px", padding: "20px" }}>
                <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.1em", marginBottom: "16px" }}>
                  AGENT ACTIONS TODAY
                </div>
                {dailyDigest.actions.map((a, i) => {
                  const iconMap = { pause: "⏸", reallocate: "↔", creative: "✦", alert: "⚠" };
                  const colorMap = { pause: "#ff3b5c", reallocate: "#00d4aa", creative: "#0084ff", alert: "#f5a623" };
                  return (
                    <div key={i} className="action-item" style={{
                      display: "flex",
                      gap: "12px",
                      padding: "10px 0",
                      borderBottom: i < dailyDigest.actions.length - 1 ? "1px solid #1a2030" : "none",
                    }}>
                      <div style={{ color: colorMap[a.type], fontSize: "14px", minWidth: "18px", marginTop: "1px" }}>{iconMap[a.type]}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", lineHeight: "1.5" }}>{a.text}</div>
                    </div>
                  );
                })}
              </div>

              {/* Budget Distribution */}
              <div style={{ background: "#0d1117", border: "1px solid #1a2030", borderRadius: "8px", padding: "20px" }}>
                <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.1em", marginBottom: "16px" }}>
                  BUDGET PACING BY CAMPAIGN
                </div>
                {campaigns.map((c, i) => {
                  const pct = Math.round((c.spend / c.budget) * 100);
                  const sc = statusConfig[c.status];
                  return (
                    <div key={i} style={{ marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <div style={{ fontSize: "10px", color: "#94a3b8", maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {c.name.split("_").slice(0, 3).join(" · ")}
                        </div>
                        <div style={{ fontSize: "10px", color: sc.color }}>{pct}%</div>
                      </div>
                      <div style={{ height: "4px", background: "#1a2030", borderRadius: "2px" }}>
                        <div style={{
                          height: "100%",
                          width: `${Math.min(pct, 100)}%`,
                          background: c.status === "pause" ? "#ff3b5c" : sc.color,
                          borderRadius: "2px",
                          opacity: c.status === "pause" ? 0.4 : 1,
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CAMPAIGNS TAB */}
        {activeTab === "campaigns" && (
          <div>
            <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.08em", marginBottom: "16px" }}>
              5 ACTIVE CAMPAIGNS · 1 PAUSED BY AGENT · SORTED BY SQL RATE
            </div>
            <div style={{ border: "1px solid #1a2030", borderRadius: "8px", overflow: "hidden" }}>
              {/* Table Header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "2.5fr 80px 80px 80px 70px 70px 80px 100px 100px",
                padding: "10px 16px",
                background: "#0d1117",
                borderBottom: "1px solid #1a2030",
                fontSize: "9px",
                color: "#4a5568",
                letterSpacing: "0.08em",
                gap: "8px",
              }}>
                <div>CAMPAIGN</div>
                <div style={{ textAlign: "right" }}>SPEND</div>
                <div style={{ textAlign: "right" }}>LEADS</div>
                <div style={{ textAlign: "right" }}>MQLS</div>
                <div style={{ textAlign: "right" }}>SQLS</div>
                <div style={{ textAlign: "right" }}>SQL%</div>
                <div style={{ textAlign: "right" }}>CPL</div>
                <div style={{ textAlign: "right" }}>PIPELINE</div>
                <div style={{ textAlign: "center" }}>STATUS</div>
              </div>
              {campaigns.map((c, i) => {
                const sc = statusConfig[c.status];
                const isExpanded = expandedCampaign === c.id;
                return (
                  <div key={i}>
                    <div
                      className="row-hover"
                      onClick={() => setExpandedCampaign(isExpanded ? null : c.id)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2.5fr 80px 80px 80px 70px 70px 80px 100px 100px",
                        padding: "12px 16px",
                        borderBottom: "1px solid #1a2030",
                        fontSize: "11px",
                        gap: "8px",
                        alignItems: "center",
                        opacity: c.status === "pause" ? 0.6 : 1,
                        background: isExpanded ? "rgba(255,255,255,0.02)" : "transparent",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "11px", color: "#e2e8f0", fontFamily: "'DM Mono', monospace" }}>
                          {c.name.length > 34 ? c.name.slice(0, 34) + "…" : c.name}
                        </div>
                        <div style={{ fontSize: "9px", color: "#4a5568", marginTop: "2px" }}>{c.channel} · {c.product}</div>
                      </div>
                      <div style={{ textAlign: "right", color: "#94a3b8" }}>{fmtINR(c.spend)}</div>
                      <div style={{ textAlign: "right", color: "#94a3b8" }}>{c.leads}</div>
                      <div style={{ textAlign: "right", color: "#0084ff" }}>{c.mqls}</div>
                      <div style={{ textAlign: "right", color: "#00d4aa" }}>{c.sqls}</div>
                      <div style={{ textAlign: "right", color: c.sqlRate > 30 ? "#00d4aa" : c.sqlRate < 15 ? "#ff6b35" : "#94a3b8", fontWeight: "500" }}>
                        {c.sqlRate}%
                      </div>
                      <div style={{ textAlign: "right", color: c.cpl > 5000 ? "#ff6b35" : "#94a3b8" }}>{fmtINR(c.cpl)}</div>
                      <div style={{ textAlign: "right", color: "#f5a623" }}>{c.pipeline > 0 ? fmtINR(c.pipeline) : "—"}</div>
                      <div style={{ textAlign: "center" }}>
                        <span style={{
                          background: sc.bg,
                          color: sc.color,
                          padding: "3px 8px",
                          borderRadius: "3px",
                          fontSize: "9px",
                          letterSpacing: "0.06em",
                          fontWeight: "500",
                        }}>{sc.label}</span>
                      </div>
                    </div>
                    {isExpanded && c.aiFlag && (
                      <div style={{
                        padding: "12px 16px",
                        background: "rgba(0,132,255,0.05)",
                        borderBottom: "1px solid #1a2030",
                        borderLeft: "3px solid #0084ff",
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                      }}>
                        <div style={{ fontSize: "11px", color: "#0084ff", marginTop: "1px" }}>✦</div>
                        <div>
                          <div style={{ fontSize: "9px", color: "#0084ff", letterSpacing: "0.08em", marginBottom: "4px" }}>AGENT INSIGHT</div>
                          <div style={{ fontSize: "11px", color: "#94a3b8", lineHeight: "1.6" }}>{c.aiFlag}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: "10px", color: "#4a5568", marginTop: "10px" }}>
              ↑ Click any row to expand agent insight
            </div>
          </div>
        )}

        {/* CREATIVE LAB TAB */}
        {activeTab === "creative" && (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.08em", marginBottom: "4px" }}>CREATIVE REFRESH TRIGGER</div>
              <div style={{
                background: "#0d1117",
                border: "1px solid #f5a623",
                borderRadius: "8px",
                padding: "14px 16px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}>
                <div style={{ color: "#f5a623", fontSize: "14px" }}>⚠</div>
                <div>
                  <div style={{ fontSize: "11px", color: "#e2e8f0", marginBottom: "3px" }}>
                    IND_Meta_Payroll_TOFU — CTR dropped to 0.9% (benchmark: 1.6%)
                  </div>
                  <div style={{ fontSize: "10px", color: "#4a5568" }}>
                    Running 18 days · Ad fatigue detected · 3 variants generated by agent
                  </div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.08em", marginBottom: "14px" }}>
              AGENT-GENERATED CREATIVE VARIANTS · FOR HUMAN REVIEW BEFORE LAUNCH
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "20px" }}>
              {creativeVariants[0].variants.map((v) => (
                <div key={v.id} className="variant-card" style={{
                  background: "#0d1117",
                  border: "1px solid #1a2030",
                  borderRadius: "8px",
                  padding: "18px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{
                      background: "rgba(0,132,255,0.12)",
                      color: "#0084ff",
                      padding: "2px 8px",
                      borderRadius: "3px",
                      fontSize: "9px",
                      letterSpacing: "0.06em",
                    }}>{v.id}</span>
                    <span style={{ fontSize: "9px", color: "#4a5568" }}>{v.angle}</span>
                  </div>
                  <div style={{
                    fontSize: "13px",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: "700",
                    color: "#fff",
                    lineHeight: "1.4",
                    marginBottom: "10px",
                  }}>{v.headline}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", lineHeight: "1.6", marginBottom: "14px" }}>{v.body}</div>
                  <div style={{
                    background: "rgba(0,212,170,0.08)",
                    border: "1px solid rgba(0,212,170,0.2)",
                    borderRadius: "4px",
                    padding: "6px 10px",
                    fontSize: "10px",
                    color: "#00d4aa",
                    display: "inline-block",
                  }}>→ {v.cta}</div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                    <button style={{
                      flex: 1, background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)",
                      borderRadius: "4px", padding: "6px", fontSize: "10px", color: "#00d4aa", cursor: "pointer",
                      fontFamily: "'DM Mono', monospace",
                    }}>✓ Approve</button>
                    <button style={{
                      flex: 1, background: "rgba(255,59,92,0.08)", border: "1px solid rgba(255,59,92,0.2)",
                      borderRadius: "4px", padding: "6px", fontSize: "10px", color: "#ff3b5c", cursor: "pointer",
                      fontFamily: "'DM Mono', monospace",
                    }}>✕ Reject</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: "#0d1117",
              border: "1px solid #1a2030",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "10px",
              color: "#4a5568",
              lineHeight: "1.8",
            }}>
              <span style={{ color: "#0084ff" }}>✦ Agent context used:</span> PeopleStrong brand voice guidelines · Payroll product page copy · Top 3 performing historical ads for Payroll · Competitor messaging analysis · ICP job titles and pain points (HR Head, CHRO, CTO in 500–2000 employee BFSI/Manufacturing)
            </div>
          </div>
        )}

        {/* FLOW TAB */}
        {activeTab === "routing" && (
          <div>
            <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.08em", marginBottom: "20px" }}>
              END-TO-END AGENT FLOW
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                {
                  step: "01",
                  title: "INGEST",
                  color: "#0084ff",
                  items: ["LinkedIn Ads API — impressions, clicks, conversions, spend", "Meta Ads API — same metrics + audience data", "HubSpot — MQL/SQL/Opp counts per UTM campaign", "Campaign benchmarks from Part A framework"],
                },
                {
                  step: "02",
                  title: "ANALYZE",
                  color: "#7c3aed",
                  items: ["Compare CPL, SQL rate, CTR vs. channel benchmarks", "Flag campaigns breaching waste thresholds (CPL > 2x, SQL% < 10%)", "Detect ad fatigue: CTR declining >20% vs. Day 1 baseline", "Calculate W-shaped pipeline influence per campaign"],
                },
                {
                  step: "03",
                  title: "ACT",
                  color: "#f5a623",
                  items: ["Auto-pause campaigns meeting 2/3 waste signals", "Reallocate paused budget to Scale-quadrant campaigns", "Generate 3 creative variants via Claude for fatigued ads", "Queue creative variants for human approval in dashboard"],
                },
                {
                  step: "04",
                  title: "REPORT",
                  color: "#00d4aa",
                  items: ["Daily Slack digest to marketing team (7:00 AM IST)", "Weekly email report to CMO with pipeline ROI summary", "All actions logged in HubSpot campaign properties", "Monthly optimization retrospective with before/after metrics"],
                },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "0" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "48px" }}>
                    <div style={{
                      width: "36px", height: "36px",
                      borderRadius: "50%",
                      background: `${s.color}22`,
                      border: `2px solid ${s.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "10px", color: s.color, fontWeight: "600",
                      flexShrink: 0,
                      zIndex: 1,
                    }}>{s.step}</div>
                    {i < 3 && <div style={{ width: "2px", flex: 1, background: "#1a2030", minHeight: "20px" }} />}
                  </div>
                  <div style={{
                    background: "#0d1117",
                    border: "1px solid #1a2030",
                    borderRadius: "8px",
                    padding: "16px 20px",
                    marginLeft: "12px",
                    marginBottom: i < 3 ? "8px" : "0",
                    flex: 1,
                  }}>
                    <div style={{ fontSize: "10px", color: s.color, letterSpacing: "0.1em", marginBottom: "10px" }}>{s.title}</div>
                    {s.items.map((item, j) => (
                      <div key={j} style={{ fontSize: "11px", color: "#94a3b8", padding: "4px 0", display: "flex", gap: "8px" }}>
                        <span style={{ color: s.color, opacity: 0.6 }}>›</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
