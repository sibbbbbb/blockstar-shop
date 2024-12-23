export const PricePill: React.FC<{ price: number; paddingClass?: string }> = ({
  price,
  paddingClass = "px-2",
}) => {
  function formatPrice(price: number) {
    // Return price with 0 decimals without ARS
    return price.toLocaleString("en-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: "narrowSymbol",
    });
  }
  return (
    <div
      className={`flex justify-center items-center text-base font-helvetica font-bold bg-gray-200 text-black rounded-full  md:w-[5.4rem] h-7 ${paddingClass}`}
    >
      <span className="text-sm md:text-base font-semibold mt-1">
        {formatPrice(Number(price))}
      </span>
    </div>
  );
};
