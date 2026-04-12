export function SAFE_URL({ url = "https://example.com/" }) {
    return (
        <div className="w-full h-full flex flex-col">
            <iframe
              src={url}
              title="SAFE-URL"
              className="h-full w-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}