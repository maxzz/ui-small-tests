// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Layout-Projection-custom-values.tsx
import { useEffect, useState } from "react";
import { addScaleCorrector, motion } from "motion/react";

/**
 * This demo is called "Framer border" because it demonstrates border animations as Framer implements borders,
 * by positioning the inner div separately to the sized outer Frame using `inset`
 * and defining additional values with handlers passed to `autoValues`.
 */
export function LayoutProjectionCustomValuesDemo() {
    const [isOn, setOn] = useState(false);

    useEffect(() => {
        if (typeof addScaleCorrector === 'function') {
            // @ts-expect-error - addScaleCorrector might be internal/deprecated
            addScaleCorrector(borderScaleCorrector);
        }
    }, []);

    return (
        <motion.div
            layout
            transition={{ duration: 3, ease: "circIn" }}
            onClick={() => setOn(!isOn)}
            style={{
                display: "block",
                position: "relative",
                background: "white",
                width: isOn ? 700 : 100,
                height: isOn ? 400 : 100,
            }}
        >
            <motion.div
                layout
                initial={false}
                animate={
                    isOn
                        ? {
                            borderColor: "#000",
                            borderTopWidth: 5,
                            borderRightWidth: 5,
                            borderLeftWidth: 5,
                            borderBottomWidth: 30,
                        }
                        : {
                            borderColor: "#90f",
                            borderTopWidth: 50,
                            borderRightWidth: 50,
                            borderLeftWidth: 50,
                            borderBottomWidth: 50,
                        }
                }
                transition={{ duration: 3, ease: "circIn" }}
                style={{
                    position: "absolute",
                    inset: "0px",
                    borderStyle: "solid",
                }}
            />
        </motion.div>
    );
}

function borderWidth(axis: "x" | "y"): { correct: ScaleCorrector; } {
    return ({
        correct: (latest: string | number, { targetDelta, treeScale }: ScaleCorrectorContext) => {
            const value = typeof latest === "string" ? parseFloat(latest) : latest;
            return value / targetDelta[axis].scale / treeScale[axis] + "px";
        },
    });
}

interface ScaleCorrectorContext {
    targetDelta: { x: { scale: number; }; y: { scale: number; }; };
    treeScale: { x: number; y: number; };
}

type ScaleCorrector = (
    latest: string | number,
    context: ScaleCorrectorContext
) => string;

const xBorder = () => borderWidth("x");
const yBorder = () => borderWidth("y");

const borderScaleCorrector = {
    borderTopWidth: yBorder(),
    borderLeftWidth: xBorder(),
    borderRightWidth: xBorder(),
    borderBottomWidth: yBorder(),
};
