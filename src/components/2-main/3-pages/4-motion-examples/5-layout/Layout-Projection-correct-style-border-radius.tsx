// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Layout-Projection-correct-style-border-radius.tsx
import { useState } from "react";
import { motion } from "motion/react";

/**
 * This demonstrates automatic border radius animations
 * on individual corners, including scale and child scale correction
 */
export function LayoutProjectionCorrectStyleBorderRadiusDemo() {
    const [isOn, setIsOn] = useState(false);

    return (
        <motion.div
            layout
            style={isOn ? bigParent : smallParent}
            onClick={() => setIsOn(!isOn)}
            transition={transition}
        />
    );
}

// Transitions

const borderTransition = {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse" as const,
};
const transition = {
    default: { duration: 6 },
    borderTopRightRadius: borderTransition,
    borderBottomRightRadius: borderTransition,
    borderRadius: borderTransition,
};

// Styles

const parent = {
    backgroundColor: "white",
};

const bigParent = {
    ...parent,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderBottomRightRadius: "10px",
};

const smallParent = {
    ...parent,
    width: 500,
    height: 100,
    borderRadius: 50,
    borderBottomRightRadius: "10px",
};
