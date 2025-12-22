// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-reparenting.tsx
import { motion, useCycle } from "motion/react";

/**
 * This example demonstrates using shared layout
 * to animate between two sets of two components with a different
 * hierarchy
 */

const Child = () => {
    return (
        <motion.div className="big" layoutId="big">
            <motion.div className="small" layoutId="small" />
        </motion.div>
    );
};

const Sibling = () => {
    return (
        <>
            <motion.div className="big purple" layoutId="big" />
            <motion.div className="small purple" layoutId="small" />
        </>
    );
};

export function SharedLayoutReparentingDemo() {
    const [isOn, toggleOn] = useCycle(false, true);

    return (
        <>
        <style>{`
.container {
    width: 200px;
    height: 340px;
    overflow: visible;
    background-color: #f3f3f3;
    border-radius: 20px;
    position: relative;
}

.small {
    width: 50px;
    height: 50px;
    overflow: visible;
    border-radius: 10px;
    position: absolute;
    background-color: #0099ff;
    top: 15px;
    left: 15px;
}

.small.purple {
    background-color: #85f;
    top: 64px;
    left: 124px;
}

.big {
    width: 148px;
    height: 148px;
    overflow: visible;
    border-radius: 20px;
    position: absolute;
    top: 97px;
    left: 26px;
    background-color: rgba(0, 153, 255, 0.3);
}

.big.purple {
    top: 137px;
    left: 26px;
    background-color: rgba(136, 85, 255, 0.3);
}
        `}</style>
        <div className="container" onClick={() => toggleOn()}>
            {isOn ? <Child /> : <Sibling />}
        </div>
        </>
    );
}

