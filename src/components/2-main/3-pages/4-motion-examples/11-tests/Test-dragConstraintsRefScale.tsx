// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragConstraintsRefScale.tsx
import { useRef } from "react";
import { motion, MotionConfig } from "motion/react";

const dragContainer = {
    width: "50%",
    height: "60vh",
    background: "#F30552",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    transform: "scale(1.2)",
};

const draggable = {
    width: 100,
    height: 100,
    background: "white",
    borderRadius: "10px",
};
export function TestDragConstraintsRefScaleDemo() {
    const ref = useRef(null);

    return (
        <div className="p-10 flex justify-center">
            <MotionConfig
                transformPagePoint={({ x, y }) => ({
                    x: x / 1.2,
                    y: y / 1.2,
                })}
            >
                <motion.div ref={ref} style={dragContainer}>
                    <motion.div
                        drag
                        dragConstraints={ref}
                        dragElastic={0.2}
                        style={draggable}
                    />
                </motion.div>
            </MotionConfig>
        </div>
    );
}

