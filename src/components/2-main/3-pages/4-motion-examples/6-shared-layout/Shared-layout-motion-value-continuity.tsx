// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Shared-layout-motion-value-continuity.tsx
import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";

export function SharedLayoutMotionValueContinuityDemo() {
    return (
        <div className="absolute inset-0 bg-white flex items-center justify-center"        >
            <Component />
        </div>
    );
}

const Component = () => {
    const [selected, setSelected] = useState(0);
    return (
        <div style={{ boxSizing: "border-box", fontFamily: "Montserrat, sans-serif", fontWeight: 800, }}>
            <ol
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    userSelect: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "translateZ(0)",
                }}
            >
                {screens.map(
                    (screen, i) => (
                        <Item
                            {...screen}
                            key={i}
                            i={i}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    )
                )}
            </ol>
        </div>
    );
};

export const screens = [
    { title: "One", color: "#ff0055", },
    { title: "Two", color: "#0099ff", },
    { title: "Threeeee", color: "#22cc88", },
    { title: "Four", color: "#ffaa00", },
];

interface ItemProps {
    i: number;
    title: string;
    selected: number;
    color: string;
    setSelected: (i: number) => void;
}

class Item extends React.Component<ItemProps> {
    render() {
        const { i, title, selected, color, setSelected } = this.props;
        return (
            <motion.li
                layout
                key={i}
                id={i.toString()}
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    userSelect: "none",
                    fontSize: i === selected ? "64px" : "32px",
                    marginLeft: "20px",
                    position: "relative",
                    cursor: "pointer",
                    color: i === selected ? color : "#333",
                }}
                onClick={() => setSelected(i)}
            >
                {i === selected && <Underline color={color} />}
                {title}
            </motion.li>
        );
    }
}

class Underline extends React.Component<{ color: string; }> {
    render() {
        return (
            <motion.div
                layoutId="underline"
                initial={false}
                animate={{ backgroundColor: this.props.color }}
                style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "4px",
                    position: "absolute",
                    bottom: "-4px",
                }}
            />
        );
    }
}
