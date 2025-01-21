"use client";

import React, { useState } from "react";
import { Dropdown, DatePicker, Button, Space } from "antd";
import moment from "moment";
import { DownOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"] });

const { RangePicker } = DatePicker;

// Utility function to get relative time ranges
const getRelativeTimeRange = (label) => {
  switch (label) {
    case "Last 5 minutes":
      return ["now-5m", "now"];
    case "Last 15 minutes":
      return ["now-15m", "now"];
    case "Last 30 minutes":
      return ["now-30m", "now"];
    case "Last 1 hour":
      return ["now-1h", "now"];
    case "Last 3 hours":
      return ["now-3h", "now"];
    default:
      return null;
  }
};

// Utility function to convert moment date range to Unix time in milliseconds
const convertToUnixTime = (dates) => {
  if (!dates) return null;
  return dates.map((date) => date.valueOf()); // Convert to milliseconds
};

const TimeRangeFilter = ({ onApply }) => {
  const defaultRange = [moment().subtract(1, "hour"), moment()];
  const defaultLabel = "Last 1 hour";

  const [open, setOpen] = useState(false); // State to control dropdown visibility
  const [timeRange, setTimeRange] = useState(convertToUnixTime(defaultRange));
  const [selectedLabel, setSelectedLabel] = useState(defaultLabel);

  const quickRanges = [
    {
      label: "Last 5 minutes",
      range: [moment().subtract(5, "minutes"), moment()],
    },
    {
      label: "Last 15 minutes",
      range: [moment().subtract(15, "minutes"), moment()],
    },
    {
      label: "Last 30 minutes",
      range: [moment().subtract(30, "minutes"), moment()],
    },
    { label: "Last 1 hour", range: [moment().subtract(1, "hour"), moment()] },
    { label: "Last 3 hours", range: [moment().subtract(3, "hours"), moment()] },
  ];

  const handleQuickRangeSelect = (label, range) => {
    const relativeRange = getRelativeTimeRange(label); // Get the "now" and "now-x" format
    setSelectedLabel(label);
    setTimeRange(range);
    setOpen(false);
    // onApply(range.map((date) => date.valueOf())); // Pass Unix time
    onApply(relativeRange); // Pass Unix time
    console.log(
      `Selected Range: ${label}, Relative Time Range: ${relativeRange}`
    ); // Log the selected value
  };

  const handleApply = () => {
    if (timeRange) {
      onApply(timeRange); // Send the Unix time range to the parent component
      setOpen(false);

      // Format the custom date range for the button label
      const formattedRange = `${moment(timeRange[0]).format(
        "YYYY-MM-DD HH:mm:ss"
      )} - ${moment(timeRange[1]).format("YYYY-MM-DD HH:mm:ss")}`;
      setSelectedLabel(formattedRange); // Update the button label with the custom date range
      console.log(
        `Custom Range Selected: ${formattedRange}, Unix Time Range: ${timeRange}`
      ); // Log the selected custom value
    }
  };

  const dropdownContent = (
    <div
      style={{
        padding: "0.5rem",
        backgroundColor: "white",
        borderRadius: "0.5rem",
      }}
      className="drop-shadow-xl"
    >
      <div>
        {quickRanges.map((range) => (
          <Button
            key={range.label}
            type="text"
            onClick={() => handleQuickRangeSelect(range.label, range.range)}
            style={{
              display: "block",
              textAlign: "left",
              width: "100%",
              marginBottom: 4,
            }}
          >
            <p className={figtree.className}>{range.label}</p>
          </Button>
        ))}
      </div>
      <div
        style={{
          padding: "0.5rem",
        }}
      >
        <RangePicker
          showTime
          onChange={(dates) => setTimeRange(convertToUnixTime(dates))}
          format="YYYY-MM-DD HH:mm:ss"
          style={{ display: "block", width: "100%", marginTop: 2 }}
        />
        <Button
          type="primary"
          onClick={handleApply}
          style={{
            display: "block",
            width: "100%",
            marginTop: 16,
          }}
        >
          <p className={figtree.className}>Apply time range</p>
        </Button>
      </div>
    </div>
  );

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      dropdownRender={() => dropdownContent} // Use `dropdownRender` to customize dropdown
      trigger={["click"]}
    >
      <Button>
        <ClockCircleOutlined />
        <p className={figtree.className}>{selectedLabel}</p>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default TimeRangeFilter;
