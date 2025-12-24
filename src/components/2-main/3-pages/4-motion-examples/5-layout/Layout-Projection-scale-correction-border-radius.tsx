// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Layout-Projection-scale-correction-border-radius.tsx
import { useState } from "react";
import { motion, Transition } from "motion/react";

/**
 * This demonstrates automatic border radius animations
 * on individual corners, including scale and child scale correction
 */
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
                transition={transition}
                style={isOn ? bigParentStyles : smallParentStyles}
                onClick={() => setIsOn(!isOn)}
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
                    transition={transition}
                    style={isOn ? bigChildStyles : smallChildStyles}
                />
            </motion.div>
        </div>
    );
}

const borderTransition: Transition = { duration: 1, repeat: Infinity, repeatType: "reverse", };

const transition = {
    default: { duration: 2 },
    borderTopRightRadius: borderTransition,
    borderBottomRightRadius: borderTransition,
    borderRadius: borderTransition,
};

// Parent styles

const parentStyles = {
    backgroundColor: "white",
};
const bigParentStyles = { ...parentStyles, width: 500, height: 500, };
const smallParentStyles = { ...parentStyles, width: 200, height: 100, };

// Child styles

const childStyles = {
    backgroundColor: "red",
};
const bigChildStyles = { ...childStyles, width: 100, height: 100, };
const smallChildStyles = { ...childStyles, width: 20, height: 20, };
