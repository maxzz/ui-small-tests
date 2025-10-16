import React, { useEffect, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

export interface IframePortalProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    children?: ReactNode;
}

/**
 * IframePortal - renders `children` inside the iframe's document via React portal.
 * Works only for same-origin iframes (default about:blank or no src).
 */
export function IframePortal({ children, className, ...props }: IframePortalProps) {
    const ref = useRef<HTMLIFrameElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const iframe = ref.current;
        if (!iframe) return;
        
        const onLoad = () => {
            const iframeDoc = iframe.contentDocument;
            if (!iframeDoc) return;

            // Copy all stylesheets from parent document to iframe
            const parentStylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
            parentStylesheets.forEach((styleNode) => {
                const clone = styleNode.cloneNode(true) as HTMLElement;
                iframeDoc.head.appendChild(clone);
            });

            // Set a minimal viewport and base styles
            const meta = iframeDoc.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0';
            iframeDoc.head.appendChild(meta);

            setMounted(true);
        };

        iframe.addEventListener("load", onLoad);
        
        // If already loaded (about:blank), set mounted
        if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
            onLoad();
        }
        
        return () => iframe.removeEventListener("load", onLoad);
    }, []);

    // When mounted and iframe body exists, portal children into it
    const target = ref.current?.contentDocument?.body ?? null;

    return (
        <>
            <iframe
                ref={ref}
                className={className}
                // keep default same-origin document
                srcDoc="<html><body></body></html>"
                // remove border and allow full sizing via classes
                style={{ border: "0" }}
                {...props}
            />
            {target && mounted && createPortal(children, target)}
        </>
    );
}