// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Events-whileTap-cancel-on-scroll.tsx
import { motion } from "motion/react";

/**
 * This demo needs to be used in mobile emulation mode
 */
export function EventsWhileTapCancelOnScrollDemo() {
    return (
        <div style={{ height: "500vh", paddingTop: 100 }}>
            <motion.div
                whileTap={{ scale: 0.5 }}
                style={styleA}
            />
        </div>
    );
}

const styleA = {
    width: 200,
    height: 200,
    background: "white",
    borderRadius: 20,
};
