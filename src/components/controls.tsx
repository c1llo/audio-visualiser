import React, { forwardRef, useState } from "react";

import defaultAudio from "../assets/eva-realisations.mp3";

const Controls = forwardRef<HTMLAudioElement>((props, ref) => {
    const [audioSrc, setAudioSrc] = useState(defaultAudio);

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const { files } = event.currentTarget;
        if (files) {
            const audio = URL.createObjectURL(files[0]);
            setAudioSrc(audio);
        }
    };

    return (
        <div
            css={{
                position: "fixed",
                bottom: "0px",
                left: "0px",
                width: "100%",
                padding: "1rem",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexFlow: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                mixBlendMode: "difference",
            }}
        >
            <audio
                src={audioSrc}
                ref={ref}
                controls={true}
                css={{
                    borderRadius: "50px",
                }}
                loop={true}
            ></audio>
            <label
                aria-label="select audio file"
                htmlFor="audio-file"
                css={{
                    fontWeight: 600,
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    padding: "0.25rem",
                }}
            >
                <span>Choose audio</span>
                <input
                    id="audio-file"
                    type="file"
                    name="audio-file"
                    onInput={handleInput}
                    accept=".mp3,audio/*"
                    css={{
                        opacity: 0,
                        display: "none",
                    }}
                />
            </label>
        </div>
    );
});

export default Controls;
