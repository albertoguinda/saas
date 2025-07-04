import React from "react";

export interface PricingTableProps {
  className?: string;
}

export default function PricingTable({ className }: PricingTableProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-3 ${className ?? ""}`.trim()}>
      <div className="border p-4 rounded-lg text-center">
        <h3 className="font-semibold mb-2">Free</h3>
        <p className="text-4xl font-bold mb-4">$0</p>
        <ul className="text-sm space-y-1">
          <li>1 Project</li>
          <li>Basic Support</li>
        </ul>
      </div>
      <div className="border p-4 rounded-lg text-center">
        <h3 className="font-semibold mb-2">Pro</h3>
        <p className="text-4xl font-bold mb-4">$9</p>
        <ul className="text-sm space-y-1">
          <li>Unlimited Projects</li>
          <li>Email Support</li>
        </ul>
      </div>
      <div className="border p-4 rounded-lg text-center">
        <h3 className="font-semibold mb-2">Premium</h3>
        <p className="text-4xl font-bold mb-4">$29</p>
        <ul className="text-sm space-y-1">
          <li>Everything Pro</li>
          <li>Priority Support</li>
        </ul>
      </div>
    </div>
  );
}
