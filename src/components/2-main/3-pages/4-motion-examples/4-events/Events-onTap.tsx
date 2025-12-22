// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Events-onTap.tsx
import { motion } from "motion/react";

/**
 * An example of the onTap event
 */

export function EventsOnTapDemo() {
    return (<>
        <motion.div
            style={style}
            onTapStart={() => console.log("onTapStart")}
            onTap={() => console.log("onTap")}
            onTapCancel={() => console.log("onTapCancel")}
            whileTap={{ scale: 0.6 }}
            whileFocus={{ outline: "5px solid blue" }}
            initial={{ outline: "0px solid blue" }}
        />

        <motion.input
            type="text"
            whileTap={{ scale: 0.6 }}
            whileFocus={{ outline: "5px solid blue" }}
            initial={{ outline: "0px solid blue" }}
        />
    </>);
}

const style = {
    width: 100,
    height: 100,
    background: "red",
};

