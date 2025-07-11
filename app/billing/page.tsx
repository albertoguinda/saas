"use client";
import { useEffect, useState } from "react";
import { Card } from "@heroui/card";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
}

export default function BillingPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/stripe/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);

          return;
        }
        setPayments(data.payments || []);
      })
      .catch(() => setError("No se pudo cargar el historial"));
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Historial de pagos</h1>
      {error && <p className="text-danger mb-4">{error}</p>}
      <Card className="p-4">
        <ul className="divide-y divide-default-200">
          {payments.map((p) => (
            <li key={p.id} className="py-2 flex justify-between text-sm">
              <span>{new Date(p.created * 1000).toLocaleDateString()}</span>
              <span>
                {(p.amount / 100).toFixed(2)} {p.currency.toUpperCase()}
              </span>
              <span className="capitalize">{p.status}</span>
            </li>
          ))}
          {payments.length === 0 && !error && (
            <li className="py-2 text-center text-default-500">
              Sin pagos registrados
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
}
