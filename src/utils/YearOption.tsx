/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Select } from "antd";
import { useEffect, useState } from "react";

// Define types for the props
interface YearOptionProps {
  currentYear: number;
  year: number;
  setThisYear: (year: any) => void; // Function to set the selected year
}

interface YearOption {
  value: string;
  label: string;
}

const YearOption: React.FC<YearOptionProps> = ({
  currentYear,
  year,
  setThisYear,
}) => {
  const [yearOptions, setYearOptions] = useState<YearOption[]>([]); // Type state as an array of YearOption objects

  useEffect(() => {
    const startYear = 2024;
    const yearRange: YearOption[] = [];

    // Add the years to the list
    for (let i = startYear; i <= currentYear; i++) {
      yearRange.push({ value: i.toString(), label: i.toString() });
    }

    setYearOptions(yearRange);
  }, [currentYear]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorTextQuaternary: "#fff",
            fontSize: 16,
            borderRadius: 10,
            colorBorder: "#AA8FFF00",
            colorText: "#fff",
            colorIcon: "#fff",
            colorBgContainer: "rgba(0,0,0,0)",
            colorBgElevated: "#2c2c2c",
            selectorBg: "#AA8FFF00",
            colorTextPlaceholder: "#2c2c2c",
          },
        },
      }}
    >
      <Select
        value={year}
        style={{ width: 100 }}
        options={yearOptions}
        className="custom-select"
        onChange={(value) => setThisYear(value)}
      />
    </ConfigProvider>
  );
};

export default YearOption;
