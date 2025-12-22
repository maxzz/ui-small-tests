// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Layout-Projection-scale-correction-border-radius.tsx
import { useState } from "react";
import { motion } from "motion/react";

/**
 * This demonstrates automatic border radius animations
 * on individual corners, including scale and child scale correction
 */
const borderTransition = {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse" as const,
};
const transition = {
    default: { duration: 2 },
    borderTopRightRadius: borderTransition,
    borderBottomRightRadius: borderTransition,
    borderRadius: borderTransition,
};

const parent = {
    backgroundColor: "white",
};
const bigParent = {
    ...parent,
    width: 500,
    height: 500,
};
const smallParent = {
    ...parent,
    width: 200,
    height: 100,
};

const child = {
    backgroundColor: "red",
};
const bigChild = {
    ...child,
    width: 100,
    height: 100,
};
const smallChild = {
    ...child,
    width: 20,
    height: 20,
};

export function LayoutProjectionScaleCorrectionBorderRadiusDemo() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="flex items-center justify-center h-full">
        <motion.div
            layout
            initial="straight"
            animate="rounded"
            variants={{
                straight: { borderRadius: 0 },
                rounded: { borderRadius: 50 },
            }}
            style={isOn ? bigParent : smallParent}
            onClick={() => setIsOn(!isOn)}
            transition={transition}
        >
            <motion.div
                layout
                id="red"
                initial="straight"
                animate="rounded"
                variants={{
                    straight: {
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                    },
                    rounded: {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                    },
                }}
                style={isOn ? bigChild : smallChild}
                transition={transition}
            />
        </motion.div>
        </div>
    );
}
