export const PricePill: React.FC<{ price: number }> = ({ price }) => {
  function formatPrice(price: number) {
    // Return price with 0 decimals without ARS
    return price.toLocaleString("en-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: 'narrowSymbol'
    });
  }
  return (
    <div className="flex items-center justify-center bg-gray-200 text-black px-2 rounded-full ">
      <span className="text-base font-semibold mt-1">
        {formatPrice(Number(price))}
      </span>
    </div>
  );
};