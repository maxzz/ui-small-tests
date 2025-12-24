// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-reparenting-transform-template.tsx
import { motion, useCycle } from "motion/react";

export function SharedLayoutReparentingTransformTemplateDemo() {
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
            layoutId="big"
            transformTemplate={(_, gen) => `translateX(-50%) translateY(-50%) ${gen}`}
            style={{
                position: "absolute",
                left: "26px",
                top: "97px",
                width: "148px",
                height: "148px",
                borderRadius: "20px",
                backgroundColor: "rgba(0, 153, 255, 0.3)",
                overflow: "visible",
            }}
        >
            <motion.div
                layoutId="small"
                style={{
                    position: "absolute",
                    left: "15px",
                    top: "15px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "10px",
                    backgroundColor: "#0099ff",
                    overflow: "visible",
                }}
            />
        </motion.div>
    );
}

function Sibling() {
    return (<>
        <motion.div
            layoutId="big"
            transformTemplate={(_, gen) => `translateX(-50%) translateY(-50%) ${gen}`}
            style={{
                position: "absolute",
                left: "26px",
                top: "137px",
                width: "148px",
                height: "148px",
                borderRadius: "20px",
                backgroundColor: "rgba(136, 85, 255, 0.3)",
                overflow: "visible",
            }}
        />

        <motion.div
            layoutId="small"
            style={{
                position: "absolute",
                left: "124px",
                top: "64px",
                width: "50px",
                height: "50px",
                borderRadius: "10px",
                backgroundColor: "#85f",
                overflow: "visible",
            }}
        />
    </>);
}
