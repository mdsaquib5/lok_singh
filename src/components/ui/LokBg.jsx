"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LokBg = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 1px", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [10, 1]);

    return (
        <div className="paralx-wrapper" ref={containerRef}>
            <div className="paralx-sticky">
                <div className="paralx-mask">
                    <motion.div style={{ scale }} className="paralx-text">
                        Lokbhadra Singh
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default LokBg;