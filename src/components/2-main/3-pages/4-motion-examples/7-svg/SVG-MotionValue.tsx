// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/SVG-MotionValue.tsx
import { motion, useMotionValue, useTransform } from "motion/react";

/**
 * An example of providing a MotionValue to an SVG component via its props
 */

export function SvgMotionValueDemo() {
    const r = useMotionValue(40);
    const fill = useTransform(r, [40, 100], ["#00f", "#f00"]);

    return (
        <svg
            width="250"
            height="250"
            viewBox="0 0 250 250"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.circle
                cx={125}
                cy={125}
                r={r}
                fill={fill}
                animate={{ r: 100, x: 100 }}
                transition={{ duration: 3 }}
            />
        </svg>
    );
}
