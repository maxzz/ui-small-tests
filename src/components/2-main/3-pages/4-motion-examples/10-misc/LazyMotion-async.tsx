// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/LazyMotion-async.tsx
import { memo } from "react";
import { m, LazyMotion } from "motion/react";

/**
 * An example of dynamically loading features from a different entry point.
 */
export function LazyMotionAsyncDemo() {
    return (
        <div className="p-10 bg-purple-600 h-full">
            <LazyMotion
                features={
                    () => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                import("./lazy-features").then((res) => {
                                    resolve(res.default);
                                });
                            }, 2000); // Simulate network delay
                        });
                    }
                }
            >
                <div className="mb-4 text-white">
                    Loading features... (2s delay)
                </div>

                <Component />
            </LazyMotion>
        </div>
    );
}

const Component = memo(() => {
    return (
        <m.div
            animate={{
                width: [null, 50, 200, 100],
            }}
            transition={{
                duration: 2,
                ease: ["circOut", "circOut", "circOut"], // 'easings' -> 'ease'
                times: [0, 0.1, 0.9, 1],
            }}
            style={style}
        />
    );
});

const style = {
    width: 100,
    height: 100,
    background: "white",
    x: 0,
    borderRadius: 20,
};
