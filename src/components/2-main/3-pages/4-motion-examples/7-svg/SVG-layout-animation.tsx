// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/SVG-layout-animation.tsx
import { motion, useCycle } from "motion/react";

export function SvgLayoutAnimationDemo() {
    const [isOpen, toggleOpen] = useCycle(true, false);
    return (
        <motion.div
            layout
            transition={transition}
            style={{
                ...container,
                left: isOpen ? 50 : "auto",
                right: isOpen ? "auto" : 50,
            }}
        >
            <svg
                viewBox="0 0 500 500"
                style={{
                    width: 500,
                    height: 500,
                }}
            >
                <motion.circle
                    cx={isOpen ? 100 : 400}
                    cy={isOpen ? 100 : 400}
                    r={50}
                    fill={"white"}
                    drag
                    layout
                    transition={transition}
                    onDragStart={() => toggleOpen()}
                />
            </svg>
        </motion.div>
    );
}

const transition = {    type: "spring" as const,    stiffness: 2,    damping: 15, };

// Styles

const container: React.CSSProperties = {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: 20,
    border: "2px solid white",
    background: "rgba(0,0,0,0.3)",
};
