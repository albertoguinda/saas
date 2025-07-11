import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";

const plans = [
  {
    name: "Free",
    price: "0€",
    features: ["1 proyecto", "Soporte básico", "Actualizaciones limitadas"],
    badge: "Actual",
    color: "success",
  },
  {
    name: "Pro",
    price: "9€/mes",
    features: [
      "Proyectos ilimitados",
      "Soporte prioritario",
      "Actualizaciones premium",
    ],
    badge: "Próximamente",
    color: "warning",
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Planes y precios</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className="p-8 flex flex-col gap-4 items-center"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <Badge color={plan.color as any}>{plan.badge}</Badge>
            </div>
            <div className="text-4xl font-extrabold">{plan.price}</div>
            <ul className="space-y-2 text-default-500">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <Button
              className="w-full"
              color="primary"
              disabled={plan.name !== "Free"}
            >
              {plan.name === "Free" ? "Activo" : "Mejorar"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
