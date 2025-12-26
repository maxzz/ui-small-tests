// Source: https://github.com/motiondivision/motion/blob/main/dev/react-19/src/examples/types.tsx
import { ReactNode } from "react";
import { motion } from "motion/react";
import * as motionClient from "motion/react-client";

export function React19MotionClientDemo() {
    return (
        <div className="relative p-4 text-sm text-foreground bg-sky-100">
            <motion.div
                style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: "10px",
                    height: "10px",
                }}
                className="motion-div"
                animate={{ left: [0, 100, 0] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    times: [0, 0.5, 1],
                    ease: "easeInOut",
                }}
                onClick={(event) => event.stopPropagation()}
            />

            <motionClient.div onClick={(event) => event.stopPropagation()} />

            <MotionComponent>
                {
                    ({ test }) => <div>{test}</div>
                }
            </MotionComponent>

            {/* <button>
                Disable animation
            </button> */}
        </div>
    );
}

const MotionComponent = motion.create(Component);

function Component({ children, ref, }: { children: (p: { test: boolean; }) => ReactNode; ref: React.Ref<HTMLDivElement>; }) {
    return (
        <div ref={ref}>
            {children({ test: true })}
        </div>
    );
}
