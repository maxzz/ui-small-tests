// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Drag-constraints-resize.tsx
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function DragConstraintsResizeDemo() {
    const [backgroundColor, setBackgroundColor] = useState("darkgray");
    useEffect(() => {
        const listener = () => {
            // The re-render will have updateBlockedByResize as true and cause clearMeasurements() to be called.
            setBackgroundColor("pink");
        };
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [backgroundColor]);

    return (
        <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: 0 }}
            style={{ ...styleA, backgroundColor }}
        />
    );
}

const styleA = {
    width: 200,
    height: 200,
    borderRadius: 20,
};
