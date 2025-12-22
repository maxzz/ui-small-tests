// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/useInstantTransition.tsx
import { motion, useInstantTransition } from "motion/react";
import { useState, useEffect } from "react";

const style = {
    width: 100,
    height: 100,
    background: "white",
};

export function HooksUseInstantTransitionDemo() {
    const [x, setX] = useState(0);
    const startInstantTransition = useInstantTransition();

    useEffect(() => {
        startInstantTransition(() => setX(100));
    }, []);

    return <motion.div initial={false} style={style} animate={{ x }} />;
}
