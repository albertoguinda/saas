"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export interface BIMViewerProps {
  modelSrc: string;
  controls?: boolean;
  environment?: "day" | "night";
  enableVR?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export default function BIMViewer({
  modelSrc,
  controls = true,
  environment = "day",
  enableVR = false,
  onLoad,
  onError,
}: BIMViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const t = useTranslations("viewer");
  const [vrSupported, setVrSupported] = useState(false);

  useEffect(() => {
    let cleanup = () => {};

    async function init() {
      const THREE = await import("three");
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );
      const { VRButton } = await import("three/examples/jsm/webxr/VRButton.js");

      const width = containerRef.current?.clientWidth || 300;
      const height = containerRef.current?.clientHeight || 150;
      const scene = new THREE.Scene();

      const dark = environment === "night" || resolvedTheme === "dark";

      scene.background = new THREE.Color(dark ? 0x111111 : 0xffffff);
      scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.3 : 0.8));
      const light = new THREE.DirectionalLight(0xffffff, dark ? 0.5 : 1);

      light.position.set(10, 10, 10);
      scene.add(light);

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

      camera.position.set(0, 2, 5);

      const renderer = new THREE.WebGLRenderer({ antialias: true });

      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      if (enableVR && navigator.xr) {
        renderer.xr.enabled = true;
        setVrSupported(true);
        containerRef.current?.appendChild(VRButton.createButton(renderer));
      }
      containerRef.current?.appendChild(renderer.domElement);

      let controlsInst: typeof OrbitControls | null = null;

      if (controls) {
        controlsInst = new OrbitControls(camera, renderer.domElement);
      }

      const loader = new GLTFLoader();

      loader.load(
        modelSrc,
        (gltf) => {
          scene.add(gltf.scene);
          onLoad?.();
        },
        undefined,
        (err) => {
          onError?.(err);
        },
      );

      function animate() {
        requestAnimationFrame(animate);
        controlsInst?.update();
        renderer.render(scene, camera);
      }
      animate();

      cleanup = () => {
        renderer.dispose();
        controlsInst?.dispose();
        containerRef.current?.replaceChildren();
      };
    }

    init();

    return cleanup;
  }, [
    modelSrc,
    controls,
    environment,
    enableVR,
    resolvedTheme,
    onLoad,
    onError,
  ]);

  return (
    <div ref={containerRef} className="relative h-96 w-full">
      <span className="sr-only">{t("loading")}</span>
      {enableVR && vrSupported && (
        <button
          className="absolute right-2 top-2 z-10 rounded bg-black/50 p-2 text-white"
          type="button"
        >
          {t("vr")}
        </button>
      )}
    </div>
  );
}
