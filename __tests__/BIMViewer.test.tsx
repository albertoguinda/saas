import { render, screen } from "@testing-library/react";

import BIMViewer from "@/components/premium/3d/BIMViewer";

jest.mock("next-themes", () => ({ useTheme: () => ({ theme: "light" }) }));

window.HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: jest.fn(),
});

jest.mock("three/examples/jsm/webxr/VRButton.js", () => ({
  VRButton: { createButton: () => document.createElement("button") },
}));

jest.mock("three/examples/jsm/loaders/GLTFLoader.js", () => ({
  GLTFLoader: class {
    load(_url: string, onLoad: () => void) {
      onLoad();
    }
  },
}));

jest.mock("three/examples/jsm/controls/OrbitControls.js", () => ({
  OrbitControls: class {
    update() {}
    dispose() {}
    constructor() {}
  },
}));

jest.mock("three", () => {
  const actual = jest.requireActual("three");

  return {
    ...actual,
    WebGLRenderer: class {
      domElement = document.createElement("canvas");
      setSize() {}
      setPixelRatio() {}
      setClearColor() {}
      render() {}
      dispose() {}
      xr = { enabled: false };
    },
  };
});

test("renders fallback cube when no model", () => {
  render(<BIMViewer />);
  expect(screen.getByRole("img")).toBeInTheDocument();
});
