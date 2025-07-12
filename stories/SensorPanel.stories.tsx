import type { Meta, StoryObj } from "@storybook/react";

import SensorPanel from "@/components/premium/iot/SensorPanel";

const meta: Meta<typeof SensorPanel> = {
  title: "Premium/IoT/SensorPanel",
  component: SensorPanel,
};

export default meta;

export const Default: StoryObj<typeof SensorPanel> = {
  args: {
    sensorType: "temperature",
  },
};
