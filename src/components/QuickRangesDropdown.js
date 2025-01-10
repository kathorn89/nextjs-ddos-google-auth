"use client";

import React, { useState } from "react";
import { Dropdown, Menu, DatePicker, Button } from "antd";
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

const QuickRangesDropdown = ({ onApply }) => {
  // Set default range to "Last 1 hour"
  const defaultRange = [moment().subtract(1, "hour"), moment()];
  const defaultLabel = "Last 1 hour"; // Default label for the time range

  const [visible, setVisible] = useState(false);
  const [timeRange, setTimeRange] = useState(convertToUnixTime(defaultRange)); // Initialize with default "Last 1 hour"
  const [selectedLabel, setSelectedLabel] = useState(defaultLabel); // State to manage the selected label

  const quickRanges = [
    { label: "Last 5 minutes" },
    { label: "Last 15 minutes" },
    { label: "Last 30 minutes" },
    { label: "Last 1 hour" }, // Default range "Last 1 hour"
    { label: "Last 3 hours" },
  ];

  // const handleMenuClick = (range, label) => {
  //   const unixRange = convertToUnixTime(range);
  //   setTimeRange(unixRange);
  //   setSelectedLabel(label); // Update the selected label
  //   setVisible(false);
  //   onApply(unixRange); // Send the Unix time range to the parent component
  //   console.log(`Selected Range: ${label}, Unix Time Range: ${unixRange}`); // Log the selected value
  // };

  const handleMenuClick = (label) => {
    const relativeRange = getRelativeTimeRange(label); // Get the "now" and "now-x" format
    setSelectedLabel(label); // Update the selected label
    setVisible(false);
    onApply(relativeRange); // Send the relative time range to the parent component
    console.log(
      `Selected Range: ${label}, Relative Time Range: ${relativeRange}`
    ); // Log the selected value
  };

  const handleApply = () => {
    if (timeRange) {
      onApply(timeRange); // Send the Unix time range to the parent component
      setVisible(false);

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

  const menu = (
    <div>
      <Menu style={{ padding: "0.5rem" }}>
        {quickRanges.map((range) => (
          <Menu.Item
            key={range.label}
            onClick={() => handleMenuClick(range.label)}
          >
            <p className={figtree.className}>{range.label}</p>
          </Menu.Item>
        ))}

        <Menu.Item key="custom">
          <RangePicker
            showTime
            onChange={(dates) => setTimeRange(convertToUnixTime(dates))}
            format="YYYY-MM-DD HH:mm:ss"
            style={{ display: "block", width: "100%" }}
          />
          <Button
            type="primary"
            onClick={handleApply}
            style={{ marginTop: 8, marginBottom: 4 }}
          >
            <p className={figtree.className}>Apply time range</p>
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        visible={visible}
        onVisibleChange={(flag) => setVisible(flag)}
      >
        <Button>
          <ClockCircleOutlined />
          <p className={figtree.className}>{selectedLabel}</p>
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default QuickRangesDropdown;
