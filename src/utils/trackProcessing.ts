export const formatTime = (duration: number): string => {
    const min = Math.floor(duration / 60)
    const sec = Math.floor(duration % 60)
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
}

export const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                const audioContext = new AudioContext();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                resolve(audioBuffer.duration);
            } catch (err) {
                reject("Failed to decode audio file");
            }
        };

        reader.onerror = () => {
            reject("Failed to read audio file");
        };

        reader.readAsArrayBuffer(file);
    });
};
