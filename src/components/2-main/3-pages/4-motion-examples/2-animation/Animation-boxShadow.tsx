// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-boxShadow.tsx
import { motion, useCycle } from "motion/react";

/**
 * An example of animating the boxShadow property.
 */
export function AnimationBoxShadowDemo() {
    
    const [elevation, cycle] = useCycle(
        { boxShadow: "5px 5px 50px #fff" },
        { boxShadow: "5px 5px 5px #000" }
    );

    return (
        <motion.div
            animate={elevation}
            transition={{ duration: 2 }}
            onTap={() => cycle()}
            style={style}
        />
    );
}

const style = {
    width: 100,
    height: 100,
    background: "white",
    opacity: 1,
    boxShadow: "5px 5px 50px #000",
};
