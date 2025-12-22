// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Drag-block-viewport-conditionally.tsx
import { motion } from "motion/react";

const styleA = {
    width: 200,
    height: 200,
    background: "white",
    borderRadius: 20,
};

/**
 * This demo needs to be used in mobile emulation mode
 */
export function DragBlockViewportConditionallyDemo() {
    return (
        <div style={{ height: "500vh", paddingTop: 100 }}>
            <motion.div dragDirectionLock drag="x" style={styleA} />
        </div>
    );
}
