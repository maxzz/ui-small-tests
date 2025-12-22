// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/LazyMotion-sync.tsx
import { memo } from "react";
import { m, LazyMotion, domAnimation } from "motion/react";

/**
 * An example of dynamically loading features from a different entry point.
 */

const style = {
    width: 100,
    height: 100,
    background: "white",
    x: 0,
    borderRadius: 20,
};

const Component = memo(() => {
    return (
        <m.div
            animate={{
                width: [null, 50, 200, 100],
            }}
            transition={{
                duration: 2,
                ease: ["circOut", "circOut", "circOut"], // easings -> ease
                times: [0, 0.1, 0.9, 1],
            }}
            style={style}
        />
    );
});

export function LazyMotionSyncDemo() {
    return (
        <div className="p-10 bg-purple-600 h-full">
            <LazyMotion features={domAnimation}>
                <Component />
            </LazyMotion>
        </div>
    );
}
