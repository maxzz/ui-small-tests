// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Drag-constraints-ref-small-container.tsx
import { useRef } from "react";
import { motion } from "motion/react";

export function DragConstraintsRefSmallContainerDemo() {
    const ref = useRef(null);
    return (
        <div ref={ref} style={container}>
            <motion.div
                drag
                dragConstraints={ref}
                whileTap={{ scale: 0.95 }}
                style={child}
            />
        </div>
    );
}

const container = {
    width: 200,
    height: 200,
    background: "rgba(255,255,255,0.5)",
    borderRadius: 20,
};

const child = {
    width: "50vw",
    height: 300,
    background: "white",
    borderRadius: 20,
};
