// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Events-whileTap-global.tsx
import { motion } from "motion/react";

export function EventsWhileTapGlobalDemo() {
    return (
        <motion.div globalTapTarget  whileTap="pressed">
            <motion.div
                variants={{
                    pressed: {
                        scale: 0.5,
                        backgroundColor: "rgba(0, 255, 0, .5)",
                    },
                }}
                style={style}
            />
        </motion.div>
    );
}

const style = {
    width: 100,
    height: 100,
    background: "rgba(255, 0, 0, 1)",
};
