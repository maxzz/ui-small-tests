// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_SVG-layout-animation-correction.tsx
import { motion, useCycle } from "motion/react";

const transition = {
    type: "spring" as const,
    stiffness: 20,
    damping: 15,
};

export function TestSvgLayoutAnimationCorrectionDemo() {
    const [isOpen, toggleOpen] = useCycle(true, false);
    return (
        <div className="p-10">
            <motion.svg
                layout
                viewBox="0 0 500 500"
                style={{
                    width: isOpen ? 250 : 500,
                    height: 500,
                    border: "2px solid white",
                    borderRadius: 20,
                    background: "rgba(0,0,0,0.3)",
                }}
            >
                <motion.rect
                    layout
                    x={0}
                    y={0}
                    width={200}
                    height={500}
                    rx="15"
                    fill="white"
                ></motion.rect>
                <motion.circle
                    layout
                    cx={isOpen ? 100 : 400}
                    cy={isOpen ? 100 : 400}
                    r={50}
                    fill={"red"}
                    // layout
                    transition={transition}
                    onClick={() => toggleOpen()}
                />
            </motion.svg>
        </div>
    );
}

