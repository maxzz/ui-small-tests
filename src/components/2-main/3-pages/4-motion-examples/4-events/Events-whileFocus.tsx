// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Events-whileFocus.tsx
import { motion } from "motion/react";

/**
 * An example of whileFocus dom event
 */
export function EventsWhileFocusDemo() {
    return (
        <ul style={{ listStyle: "none", margin: "none", padding: "none" }}>
            {list.map(
                ({ name, color }) => (
                    <li key={name}>
                        <motion.button
                            initial={{ backgroundColor: "#FFFFFF" }}
                            whileHover={{ backgroundColor: color, scale: 1.1, }}
                            whileFocus={{ backgroundColor: color, scale: 1, }}
                            
                            style={buttonStyle}
                        >
                            {name}
                        </motion.button>
                    </li>
                )
            )}
        </ul>
    );
}

const list = [
    { name: "Apple", color: "#66CC33" },
    { name: "Banana", color: "#ffe135" },
    { name: "Strawberry", color: "#fc5a8d" },
    { name: "Blueberry", color: "#4f86f7" },
];

const buttonStyle = {
    border: "none",
    outline: "none",
    width: 200,
    height: 50,
    margin: 5,
    fontSize: 15,
    borderRadius: 10,
    color: "#000000",
};
