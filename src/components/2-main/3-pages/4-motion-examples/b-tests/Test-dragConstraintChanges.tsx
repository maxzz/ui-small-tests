// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/_dragConstraintChanges.tsx
import { useState } from "react";
import { motion, PanInfo } from "motion/react";

export function TestDragConstraintChangesDemo() {
    const [constraint, setContraint] = useState(0);
    
    function onDrag(event: any, { point }: PanInfo) {
        setContraint(point.x);
    }

    return (
        <div className="p-10 h-full relative">
            <motion.div
                drag="x"
                dragConstraints={{
                    left: constraint,
                    right: constraint,
                }}
                dragElastic
                dragMomentum
                dragTransition={{ bounceStiffness: 200, bounceDamping: 40 }}
                style={{ ...styleA, y: -100 }}
            />

            <motion.div
                drag="x"
                dragElastic
                dragMomentum
                onDrag={onDrag}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 40 }}
                style={{ ...styleA, y: 100 }}
            />
        </div>
    );
}

const styleA = {
    width: 100,
    height: 100,
    background: "white",
    borderRadius: "10px",
    position: "absolute" as const,
};
