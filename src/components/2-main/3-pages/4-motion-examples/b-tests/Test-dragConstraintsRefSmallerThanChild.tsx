// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragConstraintsRefSmallerThanChild.tsx
import { useRef } from "react";
import { motion } from "motion/react";

export function TestDragConstraintsRefSmallerThanChildDemo() {
    const ref = useRef(null);

    return (
        <div className="p-10">
            <motion.div ref={ref} style={dragContainer}>
                <motion.div
                    drag="x"
                    dragConstraints={ref}
                    dragElastic={0.2}
                    style={draggable}
                />
            </motion.div>
        </div>
    );
}

const dragContainer = {
    width: "400px",
    height: "100px",
    background: "#F30552",
    borderRadius: "10px",
};

const draggable = {
    width: 1000,
    height: 100,
    background: "white",
    borderRadius: "10px",
    opacity: 0.5,
};
