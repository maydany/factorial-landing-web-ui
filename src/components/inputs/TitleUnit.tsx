export default function TitleUnit({
  title,
  unit,
  value,
  setValue,
  placeholder,
  type,
  theme,
}: {
  title: string;
  unit: string;
  placeholder: string;
  type: string;
  value: any;
  theme?: "primary" | "purple" | "yellow";
  setValue: Function;
}) {
  function getThemeColor(theme: "primary" | "purple" | "yellow" | undefined) {
    switch (theme) {
      case "primary":
        return {
          text1: "text-primary",
          text2: "text-white",
          hover: "border-secondary",
          bg: "bg-baseBg",
        };
      case "purple":
        return {
          text1: "text-systemPurple",
          text2: "text-white",
          hover: "border-systemPurple",
          bg: "bg-baseBg",
        };
      case "yellow":
        return {
          text1: "bg-blue-100",
          text2: "bg-blue-100",
          hover: "hover:border-blue-500",
          bg: "bg-blue-100",
        };
      default:
        return {
          text1: "text-blue-600",
          text2: "bg-blue-100",
          hover: "border-blue-500",
          bg: "bg-blue-100",
        };
    }
  }
  const themeColors = getThemeColor(theme);
  return (
    <label htmlFor={title}>
      <div
        className={`flex ${themeColors.hover}  border-[2px] p-3   rounded-md text-sm ${themeColors.bg}`}
      >
        <div className={`pr-1  ${themeColors.text1} text-lg`}>{title}</div>
        <div className="w-full text-lg">
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            id={title}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full text-right ${themeColors.text2} ${themeColors.bg} outline-none no-spin`}
          />
        </div>
        <div className={`${themeColors.text2} text-lg pl-3`}>{unit}</div>
      </div>
    </label>
  );
}
