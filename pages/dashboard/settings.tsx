import { Card } from "@heroui/card";
import { Switch } from "@heroui/switch";
import { Button } from "@heroui/button";
import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Ajustes</h1>
      <Card className="flex flex-col gap-6 p-8">
        <div className="flex items-center justify-between">
          <span>Modo oscuro</span>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
        <Button color="warning" variant="outline" className="mt-4">
          Eliminar cuenta (no implementado)
        </Button>
      </Card>
    </div>
  );
}
