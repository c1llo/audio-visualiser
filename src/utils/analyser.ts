export class AudioAnalyser {
    #analyser: AnalyserNode;
    #audioElement: HTMLMediaElement;
    #audioCtx: AudioContext;
    #audioSource: MediaElementAudioSourceNode | null = null;
    constructor(audioElement: HTMLMediaElement) {
        this.#audioElement = audioElement;
        this.#audioCtx = new window.AudioContext();
        this.#analyser = this.#audioCtx.createAnalyser();
        this.start();
    }
    start() {
        this.#audioSource = this.#audioCtx.createMediaElementSource(
            this.#audioElement
        );
        this.#audioSource.connect(this.#analyser);
        this.#analyser.connect(this.#audioCtx.destination);
        this.#analyser.fftSize = 128;
    }
    getData() {
        const dataArray = new Uint8Array(this.#analyser.frequencyBinCount);
        this.#analyser.getByteFrequencyData(dataArray);
        return dataArray;
    }
}
