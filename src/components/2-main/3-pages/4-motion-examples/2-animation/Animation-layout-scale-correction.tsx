// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-layout-scale-correction.tsx
import { motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * This demonstrates child scale correction working through a muggle motion
 * component.
 */
const transition = { duration: 10 };

export function AnimationLayoutScaleCorrectionDemo() {
    const [isOn, setIsOn] = useState(false);

    // Double render to ensure it doesn't matter if we trigger a animate transition mid-animation
    useEffect(() => {
        isOn && setTimeout(() => setIsOn(isOn), 500);
    }, [isOn]);

    return (
        <div className="p-10 bg-slate-200 h-full">
        <motion.div
            layout
            onClick={() => setIsOn(!isOn)}
            transition={transition}
            style={{
                background: "white",
                width: isOn ? "500px" : "200px",
                height: isOn ? "500px" : "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <motion.div>
                <motion.div
                    layout
                    transition={transition}
                    style={{
                        background: "red",
                        width: "100px",
                        height: "100px",
                    }}
                />
            </motion.div>
        </motion.div>
        </div>
    );
}
