export const srcLinkFromIframe = (iframeString: string): string | undefined => {
    const srcRegex = /src="([^"]+)"/;
    const match = srcRegex.exec(iframeString);

    if (match && match[1]) {
        return match[1];
    } else {
        return "";
    }
}