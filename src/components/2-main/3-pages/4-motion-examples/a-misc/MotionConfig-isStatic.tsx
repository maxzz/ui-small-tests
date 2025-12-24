// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/MotionConfig-isStatic.tsx
import { motion, MotionConfig } from "motion/react";

/**
 * An example of a motion tree set to static mode, like on the Framer canvas
 */
export function MotionConfigIsStaticDemo() {
    return (
        <div className="p-10 bg-blue-500 h-full">
            <p className="mb-4 text-white">
                Static mode (no animation)
            </p>
            
            <MotionConfig isStatic>
                <motion.div
                    animate={{
                        width: [null, 50, 200, 100],
                    }}
                    transition={{
                        duration: 2,
                        ease: ["circOut", "circOut", "circOut"],
                        times: [0, 0.1, 0.9, 1],
                    }}
                    style={style}
                />
            </MotionConfig>
        </div>
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
    x: 30,
    borderRadius: 20,
};
