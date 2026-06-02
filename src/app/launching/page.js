"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    BsArrowLeft,
    BsPeople,
    BsFolder,
    BsNewspaper,
    BsCpu,
    BsTv,
    BsShop
} from "react-icons/bs";
import "./launching.css";
import MediaButtons from "@/components/shared/MediaButtons";

export default function LaunchingPage() {

    // Framer Motion Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const steps = [
        {
            stepNum: "Step 01",
            title: "Press Kit & Brand Assets",
            icon: <BsFolder />,
            intro: "A centralized media repository for publishers, brand sponsors, and external partners.",
            points: [
                { label: "Founder Biography", desc: "Detailed background on Lok Singh's media journey, achievements, and ethics." },
                { label: "High-Res Brand Assets", desc: "Downloadable SVG/PNG logos, custom color codes, and visual identity guides." },
                { label: "Press Photos & Media", desc: "Professional portraits, event coverages, and downloadable photography." },
                { label: "Company Mission Statement", desc: "Our commitment to unfiltered field reporting and investigative dossiers." },
                { label: "Sponsorship & Pitch Deck", desc: "Downloadable deck outlining engagement metrics and partnership models." }
            ]
        },
        {
            stepNum: "Step 02",
            title: "Newsroom CMS & Editorial Engine",
            icon: <BsNewspaper />,
            intro: "A dedicated role-based publishing engine with a structured editorial chain.",
            flow: ["Reporter writes", "Editor reviews", "Fact Check Approval", "Publish", "Automated Distribution"],
            points: [
                { label: "Role-Based Dashboards", desc: "Custom views for Reporters, Cameramen, Editors, Fact-Checkers, and Admins." },
                { label: "Editorial Workflow CMS", desc: "A linear task pipeline ensuring all submitted content gets peer-reviewed before publishing." },
                { label: "Media Asset Library", desc: "Centralized fact-checked asset repository preventing duplicate or unverified usage." },
                { label: "Breaking News Engine", desc: "Real-time banner alerts and push notifications for urgent coverage updates." },
                { label: "Scheduled Publishing", desc: "Time-based scheduling queue for articles, newsletters, and podcasts." }
            ]
        },
        {
            stepNum: "Step 03",
            title: "Creator & Influencer Collaboration",
            icon: <BsPeople />,
            intro: "Streamline relationships and campaigns between brand partners and independent creators.",
            flow: ["Brand Campaign", "Creator Invited", "Draft Submission", "Editor Approval", "Live Launch"],
            points: [
                { label: "Unified Collaboration Hub", desc: "Connect journalists, influencers, anchors, and freelancers on shared campaigns." },
                { label: "Smart Campaign Briefs", desc: "Brands post specific campaign goals, target metrics, budgets, and timelines." },
                { label: "Secure Review Pipeline", desc: "Creators upload submissions directly to the platform for brand and editorial check." },
                { label: "Influencer CRM & Analytics", desc: "Live dashboard tracking reach, click-through-rates, and campaign performance." }
            ]
        },
        {
            stepNum: "Step 04",
            title: "AI News Research Desk",
            icon: <BsCpu />,
            intro: "Futuristic Artificial Intelligence tools built to augment investigative research.",
            points: [
                { label: "Trending Topic Detection", desc: "AI scans regional data feeds and social metrics to pinpoint emerging events." },
                { label: "Automated Summarization", desc: "Condense long public records, bills, and PDFs into quick journalistic dossiers." },
                { label: "Fake News Scanner", desc: "Cross-checks facts across verified databases to flags potential misinformation." },
                { label: "Smart Headline Assistant", desc: "Aides reporters in writing engaging, SEO-optimized headlines." }
            ]
        },
        {
            stepNum: "Step 05",
            title: "Live Media & Streaming Engine",
            icon: <BsTv />,
            intro: "Direct live field broadcasting and immediate viewer participation.",
            points: [
                { label: "RTMP Live Streaming Player", desc: "Low-latency live stream viewer for direct reporter-to-audience broadcasting." },
                { label: "Live Ticker & Comments", desc: "Real-time interactive comment ticker with built-in moderation filters." },
                { label: "Citizen Journalism tips", desc: "Enable verified citizens to upload media tips, videos, and local coordinates." }
            ]
        },
        {
            stepNum: "Step 06",
            title: "Media Marketplace & Subscription Model",
            icon: <BsShop />,
            intro: "Building a self-sustaining, independent media ecosystem through advanced monetization.",
            points: [
                { label: "Flexible Subscription Engine", desc: "Manage free, premium, and insider plans with exclusive paywall content." },
                { label: "Automated Ad Marketplace", desc: "Brands buy ad placements, sponsored columns, or PR slots directly through the portal." },
                { label: "Sponsorship Dashboards", desc: "Transparent campaign ROI metrics for corporate and independent sponsors." }
            ]
        }
    ];

    return (
        <div className="launching-wrapper">
            <motion.div
                className="roadmap-container container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="roadmap-sidebar">
                    <div className="sidebar-sticky">
                        <motion.h1 variants={itemVariants}>
                            Launching Soon
                        </motion.h1>
                        <motion.p variants={itemVariants}>
                            We are building a ground-breaking space for independent investigative stories,
                            unfiltered field reporting, and raw documentaries. Underneath, a powerful digital
                            media roadmap is unfolding.
                        </motion.p>

                        <motion.div variants={itemVariants}>
                            <MediaButtons />
                        </motion.div>
                    </div>
                </div>

                <div className="roadmap-content">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="step-card"
                            variants={itemVariants}
                        >
                            <div className="step-badge">{step.stepNum}</div>
                            <h2 style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <span style={{ color: "var(--primary)", display: "flex" }}>{step.icon}</span>
                                {step.title}
                            </h2>
                            <p className="step-intro">{step.intro}</p>

                            <ul className="step-points">
                                {step.points.map((point, pIdx) => (
                                    <li key={pIdx}>
                                        <strong>{point.label}: </strong>
                                        {point.desc}
                                    </li>
                                ))}
                            </ul>

                            {step.flow && (
                                <div className="step-flow">
                                    {step.flow.map((flowNode, fIdx) => (
                                        <span key={fIdx} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                            {fIdx > 0 && <span className="flow-arrow">➔</span>}
                                            <span className="flow-node">{flowNode}</span>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
