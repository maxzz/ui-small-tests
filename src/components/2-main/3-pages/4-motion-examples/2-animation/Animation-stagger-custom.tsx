// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-stagger-custom.tsx
import { useState, useEffect } from "react";
import { useAnimation, motion } from "motion/react";

export function AnimationStaggerCustomDemo() {
    const [center, setCenter] = useState({ x: len / 2, y: len / 2 });

    const cells = Array.from(Array(count).keys()).map(
        (i) => {
            return (
                <Cell key={i} center={center} i={i} onClick={() => setCenter({ x: col(i), y: row(i) })} />
            );
        }
    );

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${len}, 1fr)`,
                    gridGap: 8,
                    height: 320,
                    width: 320,
                    margin: "32px auto",
                }}
            >
                {cells}
            </div>
            <p className="text-white">click to ripple</p>
        </div>
    );
}

function Cell({ center, i, onClick }: { center: { x: number; y: number; }; i: number; onClick: () => void; }) {
    const x = col(i);
    const y = row(i);
    const d = distance2D({ x, y }, center);
    const n = Math.max(d / max, 0.05); // normalized

    const animation = useAnimation();

    async function animate() {
        await animation.start({
            scale: 1,
            y: 0,
            opacity: 1,
            transition: { duration: 0.15 },
        });

        await animation.start({
            scale: Math.min(1, 0.2 + n),
            y: Math.max(0, (0.5 - n) * 50),
            opacity: 0.5,
            transition: {
                delay: d * stagger,
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
            },
        });
    }

    useEffect(() => {
        animate();
    });

    return (
        <div style={{ height: "100%", width: "100%" }} onClick={onClick}>
            <motion.div
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "50%",
                    background: "white",
                }}
                animate={animation} />
        </div>
    );
}

// Utilities

const distance2D = (a: { x: number; y: number; }, b: { x: number; y: number; }) => Math.hypot(a.x - b.x, a.y - b.y);

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const count = 100;
const len = Math.floor(Math.sqrt(count));
const max = Math.hypot(len, len);
const col = (v: number) => wrap(0, len, v);
const row = (i: number) => Math.floor(i / len);
const stagger = 0.1;
