import { FC, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

export interface BIMViewerProps {
  modelSrc?: string;
  controls?: boolean;
  environment?: "light" | "dark" | "auto";
}

/**
 * Renderiza un modelo BIM usando Three.js con soporte opcional de controles y VR.
 */
const BIMViewer: FC<BIMViewerProps> = ({
  modelSrc,
  controls = true,
  environment = "auto",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);
    const vrBtn = VRButton.createButton(renderer);

    container.appendChild(vrBtn);

    const env = environment === "auto" ? theme : environment;

    renderer.setClearColor(env === "dark" ? 0x222222 : 0xffffff);

    const light = new THREE.AmbientLight(0xffffff, 1);

    scene.add(light);

    let controlsInst: OrbitControls | null = null;

    if (controls) {
      controlsInst = new OrbitControls(camera, renderer.domElement);
    }

    camera.position.set(0, 1, 3);
    controlsInst?.update();

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controlsInst?.update();
      renderer.render(scene, camera);
    };

    animate();

    const loader = new GLTFLoader();

    if (modelSrc) {
      loader.load(
        modelSrc,
        (gltf) => {
          scene.add(gltf.scene);
        },
        undefined,
        () => {
          const geo = new THREE.BoxGeometry();
          const mat = new THREE.MeshStandardMaterial({ color: 0x0077ff });

          scene.add(new THREE.Mesh(geo, mat));
        },
      );
    } else {
      const geo = new THREE.BoxGeometry();
      const mat = new THREE.MeshStandardMaterial({ color: 0x0077ff });

      scene.add(new THREE.Mesh(geo, mat));
    }

    return () => {
      cancelAnimationFrame(animId);
      controlsInst?.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      container.removeChild(vrBtn);
    };
  }, [modelSrc, controls, environment, theme]);

  return (
    <div
      ref={containerRef}
      aria-label="3d viewer"
      className="w-full h-64"
      role="img"
    />
  );
};

export default BIMViewer;
