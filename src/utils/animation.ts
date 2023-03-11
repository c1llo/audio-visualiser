import * as THREE from "three";
//Credit to Danilo Guanabara for the original shader
import fragmentShader from "./fragmentShader.glsl?raw";

const vertexShader = `
void main() {
  gl_Position = vec4( position, 1.0 );
}
`;

export class AnimationRenderer {
    #container: HTMLElement;
    #camera: THREE.Camera;
    #scene: THREE.Scene;
    #renderer: THREE.Renderer;
    #uniforms: { [uniform: string]: THREE.IUniform };

    constructor(container: HTMLElement) {
        this.#container = container;

        this.#camera = new THREE.Camera();
        this.#camera.position.z = 2;

        this.#scene = new THREE.Scene();

        this.#uniforms = {
            u_pos: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2() },
        };

        const material = new THREE.ShaderMaterial({
            uniforms: this.#uniforms,
            vertexShader,
            fragmentShader,
            glslVersion: THREE.GLSL3,
        });

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        this.#scene.add(mesh);

        this.#renderer = new THREE.WebGLRenderer();

        this.#container.appendChild(this.#renderer.domElement);

        this.onWindowResize();

        window.addEventListener(
            "resize",
            this.onWindowResize.bind(this),
            false
        );
    }
    onWindowResize() {
        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        this.#uniforms.u_resolution.value.x = this.#renderer.domElement.width;
        this.#uniforms.u_resolution.value.y = this.#renderer.domElement.height;
    }
    render(data: Uint8Array) {
        const total = data.reduce((a, b) => a + b, 0);
        const avg = total / data.length;
        this.#uniforms.u_pos.value += (avg / 255) * 0.03;
        this.#renderer.render(this.#scene, this.#camera);
    }
    reset() {
        this.#uniforms.u_pos.value = 0.0;
    }
    stop() {
        window.removeEventListener("resize", this.onWindowResize);
    }
}
