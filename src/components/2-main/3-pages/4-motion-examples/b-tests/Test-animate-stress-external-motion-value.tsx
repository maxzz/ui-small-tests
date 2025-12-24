// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/animate-stress-external-motion-value.tsx
import { motion, useMotionValue } from "motion/react";

export function TestAnimateStressExternalMotionValueDemo() {
    
    const boxes = Array.from(Array(100).keys()).map( // Reduced count from 1000 to 100
        (i) => (
            <Box i={i} key={i} />
        )
    );

    return (
        <div
            style={{
                padding: 100,
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            {boxes}
        </div>
    );
}

function Box({ i }: { i: number; }) {
    const rotate = useMotionValue(0);
    return (
        <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
                rotate,
                background: `hsla(${i * 10}, 100%, 50%, 1)`,
                width: 100,
                height: 100,
            }}
        />
    );
}
