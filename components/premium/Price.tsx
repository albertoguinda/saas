import clsx from "clsx";

export interface PriceProps extends React.ComponentProps<"p"> {
  amount: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
}

export default function Price({
  amount,
  className,
  currencyCode = "USD",
  currencyCodeClassName,
  ...props
}: PriceProps) {
  return (
    <p suppressHydrationWarning className={className} {...props}>
      {new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}
      <span className={clsx("ml-1 inline", currencyCodeClassName)}>
        {currencyCode}
      </span>
    </p>
  );
}
