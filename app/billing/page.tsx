"use client";
import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { useTranslations } from "next-intl";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
}

export default function BillingPage() {
  const t = useTranslations("billing");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/stripe/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(t("error"));

          return;
        }
        setPayments(data.payments || []);
      })
      .catch(() => setError(t("error")));
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
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
            <li className="py-2 text-center text-default-500">{t("empty")}</li>
          )}
        </ul>
      </Card>
    </div>
  );
}
