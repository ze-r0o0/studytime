import imageCompression from "browser-image-compression";

export async function compressImage(file) {
    const options = {
        maxSizeMB: 0.1, // around 100KB
        maxWidthOrHeight: 300,
        useWebWorker: true,
    };

    try {
        const compressed = await imageCompression(file, options);
        const base64 = await imageCompression.getDataUrlFromFile(compressed);
        return base64; // you can save this to localStorage
    } catch (err) {
        console.error("Image compression failed:", err);
        return null;
    }
}
