import React, { useEffect, useLayoutEffect, useRef, useState, ReactNode } from "react";
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

    useLayoutEffect(() => {
        const iframe = ref.current;
        if (!iframe) return;

        const setupIframe = () => {
            const iframeDoc = iframe.contentDocument;
            if (!iframeDoc) return;

            // Prevent duplicate setup
            if (iframeDoc.head.querySelector('[data-iframe-setup]')) return;

            // Mark as setup
            const marker = iframeDoc.createElement('meta');
            marker.setAttribute('data-iframe-setup', 'true');
            iframeDoc.head.appendChild(marker);

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

            // Add base styles to ensure iframe body takes full height
            const style = iframeDoc.createElement('style');
            style.textContent = `
                html, body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    overflow: auto;
                }
            `;
            iframeDoc.head.appendChild(style);

            setMounted(true);
        };

        // Try to setup immediately if document is ready
        if (iframe.contentDocument?.readyState === "complete") {
            setupIframe();
        } else {
            // Otherwise wait for load event
            iframe.addEventListener("load", setupIframe);
        }

        return () => {
            iframe.removeEventListener("load", setupIframe);
        };
    }, []);

    // When mounted and iframe body exists, portal children into it
    const target = ref.current?.contentDocument?.body ?? null;

    return (<>
        <iframe
            ref={ref}
            className={className}
            // keep default same-origin document with proper structure
            srcDoc="<!DOCTYPE html><html><head></head><body></body></html>"
            // remove border and allow full sizing via classes
            style={{ border: "0", display: "block" }}
            {...props}
        />
        {target && mounted && createPortal(children, target)}
    </>);
}