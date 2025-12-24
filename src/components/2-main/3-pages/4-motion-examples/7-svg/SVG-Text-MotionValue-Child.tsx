// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/SVG-Text-MotionValue-Child.tsx
import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

/**
 * An example of providing a MotionValue to a component directly.
 *  Testing both a SVG text and HTML h1 element.
 */
export function SvgTextMotionValueChildDemo() {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(
        () => {
            const animation = animate(count, 100, { duration: 10 });
            return animation.stop;
        }, [count]  // Added dependency
    );

    return (
        <div className="flex flex-col items-center">
            
            <p className="text-white">
                SVG
            </p>

            <svg width="250" height="250" viewBox="0 0 250 250" style={{ border: '1px solid white' }}>
                <motion.text
                    className="text-white"
                    x={125}
                    y={125}
                    fontSize={40}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="currentColor"
                >
                    {rounded}
                </motion.text>
            </svg>

            <p className="text-white">
                HTML
            </p>

            <motion.h1 className="text-4xl text-white">
                {rounded}
            </motion.h1>

            <motion.p className="text-white">
                {rounded}
            </motion.p>
        </div>
    );
}
