// Source: https://github.com/motiondivision/motion/blob/main/dev/react/src/examples/Animation-stagger.tsx
import * as React from "react";
import { useState } from "react";
import { motion } from "motion/react";

export function AnimationStaggerDemo() {
    const [isOpen, setIsOpen] = useState(true);
    const [items, setItems] = React.useState([0, 1, 2, 3, 4, 5]);
    
    return (
        <motion.ul
            variants={sidebarPoses}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            style={sidebarStyle}
            onClick={() => setIsOpen(!isOpen)}
        >
            {shuffle(items).map((i) => {
                return (
                    <motion.li key={i} variants={itemPoses} style={itemStyle} />
                );
            })}
        </motion.ul>
    );
}

const sidebarPoses = {
    open: {
        x: 0,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
    closed: {
        x: -180,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.05,
        },
    },
};

const itemPoses = {
    open: {
        scale: 1,
        opacity: 1,
        transition: {
            scale: {
                type: "spring" as const,
                stiffness: 400,
                velocity: 40,
                damping: 20,
            },
        },
    },
    closed: { 
        scale: 0.5, 
        opacity: 0.1, 
        transition: { duration: 1 } 
    },
};

function shuffle(array: any[]) {
    let currentIndex = array.length;
    let tmp: any;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        tmp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tmp;
    }

    return array;
}

const sidebarStyle = {
    width: 100,
    position: "absolute" as const,
    top: 0,
    left: 0,
    bottom: 0,
    background: "white",
    listStyle: "none" as const,
    padding: 40,
    margin: 0,
};

const itemStyle = {
    width: 100,
    height: 100,
    background: "red",
    padding: 0,
    margin: 0,
};
