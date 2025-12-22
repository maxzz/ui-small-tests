// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/usePresence.tsx
import { usePresence, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const style = {
    width: 100,
    height: 100,
    background: "red",
    opacity: 1,
};

const Component = () => {
    const [isPresent, safeToRemove] = usePresence();

    useEffect(() => {
        !isPresent && setTimeout(safeToRemove, 1000);
    }, [isPresent, safeToRemove]);

    return <div style={{ ...style, background: isPresent ? "green" : "red" }} />;
};

export function HooksUsePresenceDemo() {
    const [isVisible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(!isVisible);
        }, 2000);
        return () => clearTimeout(timeout);
    });

    return (
        <AnimatePresence initial={false} onExitComplete={() => console.log("rest")}>
            {isVisible && <Component />}
        </AnimatePresence>
    );
}
