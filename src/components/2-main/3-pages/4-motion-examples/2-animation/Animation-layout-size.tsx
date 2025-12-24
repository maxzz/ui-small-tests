// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-layout-size.tsx
import { motion, useCycle } from "motion/react";

/**
 * An example of animating the boxShadow property.
 */
export function AnimationLayoutSizeDemo() {
    const [open, cycle] = useCycle(false, true);

    return (
        <div
            onClick={() => cycle()}
            style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                layout
                transition={{ duration: 2 }}
                initial={{ borderRadius: 20 }}
                style={{
                    ...style,
                    height: open ? 300 : 100,
                }}
            />
        </div>
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
};
