import { useEffect, useRef } from "react";
import Controls from "./components/controls";

import { AudioAnalyser } from "./utils/analyser";
import { AnimationRenderer } from "./utils/animation";

const App = () => {
    const audioElement = useRef<HTMLAudioElement>(null);
    const containerElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let analyser: AudioAnalyser;
        let renderer: AnimationRenderer;

        const analyse = () => {
            const data = analyser.getData();
            renderer.render(data);
            window.requestAnimationFrame(analyse);
        };

        if (containerElement.current) {
            renderer = new AnimationRenderer(containerElement.current);
            renderer.render(new Uint8Array([0]));
        }

        if (audioElement.current) {
            audioElement.current.volume = 0.1;
            audioElement.current.addEventListener("durationchange", () => {
                renderer.reset();
            });
            audioElement.current.addEventListener("play", () => {
                analyser = new AudioAnalyser(
                    audioElement.current as HTMLAudioElement
                );
                window.requestAnimationFrame(analyse);
            });
        }
    }, []);

    return (
        <div
            css={{
                display: "flex",
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
                overflow: "hidden",
            }}
        >
            <div
                css={{ width: "100%", height: "100%" }}
                ref={containerElement}
            ></div>
            <Controls ref={audioElement} />
        </div>
    );
};

export default App;
