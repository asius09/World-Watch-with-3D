import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class EarthScene {
    constructor(canvasId) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.earth = null;

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(canvasId),
            antialias: true,
            alpha: true,
        });

        this.setupScene();
        this.setupLights();
        this.setupControls();
        this.setupEventListeners();
    }

    setupScene() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 10;

        // Add space background
        const textureLoader = new THREE.TextureLoader();
        const spaceTexture = textureLoader.load('./texture/image.png');
        this.scene.background = spaceTexture;

        // Add post-processing
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 2);
        sunLight.position.set(5, 3, 5);
        sunLight.castShadow = true;
        this.scene.add(sunLight);

        const spotLight = new THREE.SpotLight(0x00ffff, 1);
        spotLight.position.set(-5, 5, 0);
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.2;
        spotLight.decay = 1;
        spotLight.distance = 100;
        this.scene.add(spotLight);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 0.5;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 20;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    updateEarthScale() {
        if (this.earth) {
            let baseScale = 6;
            let scaleFactor = Math.max(0.5, Math.min(1, window.innerWidth / 1920));
            let scale = baseScale * scaleFactor;
            this.earth.scale.set(scale, scale, scale);
        }
    }

    async loadEarth() {
        return new Promise((resolve) => {
            const loader = new GLTFLoader();
            loader.load('./earth.glb', (gltf) => {
                this.earth = gltf.scene;
                this.updateEarthScale();
                this.scene.add(this.earth);
                resolve();
            });
        });
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        
        if (this.earth) {
            this.earth.rotation.y += 0.001;
        }
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    async init() {
        await this.loadEarth();
        this.animate();
    }
}