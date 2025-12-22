// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useVelocity.tsx
import {
    motion,
    useMotionValue,
    useVelocity,
    useMotionValueEvent,
    // frameData, // frameData is deprecated/removed in v10?
} from "motion/react";

export function HooksUseVelocityDemo() {
    const x = useMotionValue(0);
    const xVelocity = useVelocity(x);
    const xAcceleration = useVelocity(xVelocity);

    useMotionValueEvent(x, "change", (v: number) =>
        console.log("x", Math.round(v))
    );

    useMotionValueEvent(xVelocity, "change", (v: number) =>
        console.log(
            "x velocity",
            Math.round(v)
        )
    );

    useMotionValueEvent(xAcceleration, "change", (v: number) =>
        console.log(
            "x acceleration",
            Math.round(v)
        )
    );

    return (
        <motion.div
            animate={{ x: 100 }}
            transition={{ duration: 1, ease: "linear" }}
            style={{ x, width: 100, height: 100, background: "red" }}
        />
    );
}
