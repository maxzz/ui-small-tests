// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-sibling-to-child.tsx
import { motion, useCycle } from "motion/react";

export function SharedLayoutSiblingToChildDemo() {
    const [isOn, toggleOn] = useCycle(false, true);

    return (
        <div
            style={{
                position: "relative",
                width: "200px",
                height: "340px",
                backgroundColor: "#f3f3f3",
                borderRadius: "20px",
                overflow: "visible",
            }}
            onClick={() => toggleOn()}
        >
            {isOn ? <Child /> : <Sibling />}
        </div>
    );
}

function Child() {
    return (
        <motion.div
            animate
            layoutId="big"
            style={{
                position: "absolute",
                left: "26px",
                top: "137px",
                width: "120px",
                height: "120px",
                backgroundColor: "rgba(136, 85, 255, 0.3)",
                borderRadius: "20px",
                overflow: "visible",
            }}
        >
            <motion.div
                animate
                layoutId="small"
                style={{
                    position: "absolute",
                    left: "30px",
                    top: "30px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "10px",
                    backgroundColor: "#85f",
                    overflow: "visible",
                }}
            />
        </motion.div>
    );
}

function Sibling() {
    return (<>
        <motion.div
            animate
            layoutId="big"
            style={{
                position: "absolute",
                left: "40px",
                top: "110px",
                width: "60px",
                height: "60px",
                backgroundColor: "rgba(0, 153, 255, 0.3)",
                borderRadius: "10px",
                overflow: "visible",
            }}
        />
        <motion.div
            animate
            layoutId="small"
            style={{
                position: "absolute",
                left: "102px",
                top: "172px",
                width: "60px",
                height: "60px",
                borderRadius: "10px",
                backgroundColor: "#0099ff",
                overflow: "visible",
            }}
        />
    </>);
}
