// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Prop-ref.tsx
import { motion } from "motion/react";
import { useRef, useLayoutEffect, useEffect } from "react";

/**
 * An example of passing in an external ref
 */

export function PropRefDemo() {
    const vanillaRef = useRef(null);
    const motionRef = useRef(null);

    useLayoutEffect(() => {
        console.log("useLayoutEffect =======");
        console.log("vanilla ref", vanillaRef.current);
        console.log("motion ref", motionRef.current);
    });

    useEffect(() => {
        console.log("useEffect =======");
        console.log("vanilla ref", vanillaRef.current);
        console.log("motion ref", motionRef.current);
    });

    return (
        <div className="p-10 text-white">
            <p>Check console for refs</p>
            <div ref={vanillaRef} />
            <motion.div ref={motionRef} />
        </div>
    );
}
