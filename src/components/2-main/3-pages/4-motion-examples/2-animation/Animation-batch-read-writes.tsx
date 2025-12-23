// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-batch-read-writes.tsx
import { MotionConfig, motion } from "motion/react";

// window.MotionHandoffAnimation = () => 0;

export function AnimationBatchReadWritesDemo() {
    return (
        <MotionConfig transition={{ duration: 2 }}>
            <div
                style={
                    { "--a": "#00F", "--b": "360deg", "--c": "100px" }
                }
            >
                <motion.div animate={{ backgroundColor: "var(--a)" }} style={style}>a</motion.div>
                <motion.div animate={{ y: 100 }} style={style}>a</motion.div>
                
                <svg>
                    <motion.circle />
                </svg>

                <motion.div animate={{ opacity: 0.5 }} style={style}>a</motion.div>
                <motion.div animate={{ rotate: "var(--b)", top: "200px" }} style={style}>a</motion.div>
                
                <svg>
                    <motion.circle />
                </svg>

                <motion.div animate={{ x: "var(--c)" }} style={style}>a</motion.div>
            </div>
        </MotionConfig>
    );
}

const style = {
    width: 100,
    height: 100,
    backgroundColor: "#f00",
    x: 0,
    borderRadius: 20,
    color: "rgba(0,0,0,0)",
};
