import { TextHoverEffect } from "./text-hover-effect";

export function WelcomeHeroTitle({ allowHandleFiles }: { allowHandleFiles: boolean; }) {
    return (<>
        <div className="text-2xl font-extrabold opacity-30 scale-y-125 select-none" style={titleStyle}>
            Welcome to the Password Manager Admin Tool
        </div>

        <div className="h-24 [--yellow-500:#fff400] [--red-500:#ea3939] [--blue-500:#395eea] [--cyan-500:#39ead7]">
            <TextHoverEffect text="Welcome to the Password Manager Admin Tool" duration={0.5} />
        </div>
    </>);
}

const titleStyle = {
    color: 'black',
    WebkitTextFillColor: 'transparent',
    WebkitTextStroke: '0.1px hsl(var(--foreground))',
    WebkitFontSmoothing: 'antialiased',
};
