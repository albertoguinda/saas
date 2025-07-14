import { render, screen, waitFor } from "@testing-library/react";
import BIMViewer from "@/components/premium/3d/BIMViewer";

jest.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light" }) }));
jest.mock("next-intl", () => ({ useTranslations: () => (key: string) => key.split(".").pop() }));

jest.mock("three", () => ({
  Scene: class { add() {} background: any = null; },
  PerspectiveCamera: class {
    position = { set() {} };
  },
  WebGLRenderer: class {
    domElement = document.createElement("canvas");
    xr = { enabled: false };
    setSize() {}
    setPixelRatio() {}
    render() {}
    dispose() {}
    setAnimationLoop(fn: any) { fn(); }
  },
  AmbientLight: class {},
  DirectionalLight: class { constructor() { this.position = { set() {} }; } },
  Color: class {},
}));

jest.mock("three/examples/jsm/controls/OrbitControls.js", () => ({
  OrbitControls: class {
    constructor() {}
    update() {}
    dispose() {}
  },
}));

jest.mock("three/examples/jsm/loaders/GLTFLoader.js", () => ({
  GLTFLoader: class {
    load(_src: string, onLoad: (obj: any) => void) { onLoad({ scene: {} }); }
  },
}));

jest.mock("three/examples/jsm/webxr/VRButton.js", () => ({
  VRButton: { createButton: () => document.createElement("button") },
}));

test("renders container", () => {
  render(<BIMViewer modelSrc="model.glb" />);
  expect(screen.getByText("loading")).toBeInTheDocument();
});

test("calls onLoad", async () => {
  const onLoad = jest.fn();
  render(<BIMViewer modelSrc="model.glb" onLoad={onLoad} />);
  await waitFor(() => expect(onLoad).toHaveBeenCalled());
});

test("shows VR button", async () => {
  // @ts-ignore
  navigator.xr = {};
  render(<BIMViewer enableVR modelSrc="model.glb" />);
  expect(await screen.findByRole("button", { name: "vr" })).toBeInTheDocument();
});
