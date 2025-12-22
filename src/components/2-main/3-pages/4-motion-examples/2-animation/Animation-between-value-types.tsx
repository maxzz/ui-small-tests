// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-between-value-types.tsx
import * as React from "react";
import { motion, useCycle } from "motion/react";

/**
 * An example of animating between different value types
 */

export function AnimationBetweenValueTypesDemo() {
    const [width, nextWidth] = useCycle<string | number>(0, "100%", "calc(50% + 100px)");

    return (
        <div style={stretch} onClick={() => nextWidth()}>
            <motion.div
                initial={false}
                animate={{ width }}
                transition={{ duration: 5 }}
                style={style}
            />
        </div>
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
};

const stretch: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

