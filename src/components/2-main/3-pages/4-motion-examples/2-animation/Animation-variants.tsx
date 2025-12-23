// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-variants.tsx
import { Fragment, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export function AnimationVariantsDemo() {
    const [isActive, setIsActive] = useState(true);

    const backgroundColor = useMotionValue("#f00");

    return (
        <MotionFragment initial="initial" animate={isActive ? "to" : "initial"}>
            <motion.div>
                <motion.div
                    variants={{
                        initial: { backgroundColor: "#f00", },
                        to: { backgroundColor: "#00f", },
                    }}
                    onClick={() => setIsActive(!isActive)}
                    style={{ ...boxStyles, backgroundColor }}
                />
            </motion.div>
        </MotionFragment>
    );
}

const MotionFragment = motion.create(Fragment);

const boxStyles = {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
};
