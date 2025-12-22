// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/layout-memory.tsx
import { motion, MotionConfig } from "motion/react";
import * as React from "react";
import { useState } from "react";

const containerStyles = {
    display: "flex",
    flexWrap: "wrap" as const,
    width: "1000px",
    height: "4000px",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "flex-start",
};

const baseStyles = {
    width: "var(--width)",
    height: "var(--height)",
};

const baseOffset = "var(--offset)";

function Group({ children }: React.PropsWithChildren) {
    return (
        <motion.div
            layout
            style={{
                ...baseStyles,
                backgroundColor: "hsla(0, 50%, 50%)",
                position: "relative",
                display: "flex",
            }}
        >
            <motion.div
                layout
                style={{
                    ...baseStyles,
                    backgroundColor: "hsla(20, 50%, 50%)",
                    position: "absolute",
                    top: baseOffset,
                    left: baseOffset,
                }}
            />
            <motion.div
                layout
                style={{
                    width: baseOffset,
                    height: baseOffset,
                    backgroundColor: "hsla(60, 50%, 50%)",
                }}
            />
            <motion.div
                layout
                style={{
                    width: baseOffset,
                    height: baseOffset,
                    backgroundColor: "hsla(90, 50%, 50%)",
                }}
            >
                {children}
            </motion.div>
            <motion.div
                layout
                style={{
                    ...baseStyles,
                    backgroundColor: "hsla(120, 50%, 50%)",
                    position: "absolute",
                    top: baseOffset,
                    left: baseOffset,
                }}
            />
            <motion.div
                layout
                style={{
                    ...baseStyles,
                    backgroundColor: "hsla(170, 50%, 50%)",
                    position: "absolute",
                    top: baseOffset,
                    left: baseOffset,
                }}
            >
                <motion.div
                    layout
                    style={{
                        ...baseStyles,
                        backgroundColor: "hsla(220, 50%, 50%)",
                        position: "absolute",
                        top: baseOffset,
                        left: baseOffset,
                    }}
                />
                <motion.div
                    layout
                    style={{
                        ...baseStyles,
                        backgroundColor: "hsla(260, 50%, 50%)",
                        position: "absolute",
                        top: baseOffset,
                        left: baseOffset,
                    }}
                >
                    <motion.div
                        layout
                        style={{
                            ...baseStyles,
                            backgroundColor: "hsla(300, 50%, 50%)",
                            position: "absolute",
                            top: baseOffset,
                            left: baseOffset,
                        }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export function LayoutMemoryDemo() {
    const [expanded, setExpanded] = useState(false);
    const [count, setCount] = useState(0);

    return (
        <div className="p-10">
        <MotionConfig transition={{ duration: 10, ease: "linear" }}>
            <button className="bg-white px-2 py-1 rounded mb-4" onClick={() => setCount(count + 1)}>
                Replace children
            </button>
            <div
                data-layout
                key={count}
                style={{
                    ...containerStyles,
                    ...(expanded
                        ? {
                              "--width": "500px",
                              "--height": "500px",
                              "--offset": "100px",
                          }
                        : {
                              "--width": "200px",
                              "--height": "200px",
                              "--offset": "10px",
                          }) as any,
                }}
                onClick={() => {
                    setExpanded(!expanded);
                }}
            >
                <Group>
                    <Group />
                </Group>
                {/* Reduced number of groups for demo performance/visibility */}
                <Group>
                    <Group />
                </Group>
            </div>
        </MotionConfig>
        </div>
    );
}

