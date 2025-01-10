"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import MyIframe from "./MyIframe";
import { DownOutlined } from "@ant-design/icons";
const QuickRangesDropdown = dynamic(() => import("./QuickRangesDropdown"), {
  ssr: false,
});

export default function Page() {
  // Set default range to "Last 1 hour"
  const defaultRange = [
    moment().subtract(1, "hour").valueOf(), // 1 hour ago in milliseconds
    moment().valueOf(), // Current time in milliseconds
  ];

  const [timeRange, setTimeRange] = useState(defaultRange); // Initialize state with default range

  // Visibility state for sections
  const [showSummary, setShowSummary] = useState(true);
  const [showTCP, setShowTCP] = useState(true);
  const [showHealthCheck, setShowHealthCheck] = useState(true);

  const GRAFANA_DASHBOARD_URL =
    "http://13.228.191.154:3777/d-solo/adu68f1hmk1s0h90/apache-jmeter-dashboard-v5?orgId=1";

  const panel = {
    httpRow1: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=31`,
        id: "activeUser",
      },
    ],
    httpRow2: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=26`,
        id: "totalReq",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=28`,
        id: "failedReq",
      },
    ],
    httpRow3: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=98`,
        id: "successRate",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=29`,
        id: "errorRate",
      },
    ],
    httpRow4: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=37`,
        id: "tSentByte",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=2`,
        id: "tError",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=4`,
        id: "tThroughput",
      },
    ],
    httpRow5: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=65`,
        id: "avgResp",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=36`,
        id: "networkTff",
      },
    ],

    tcpRow1: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=60`,
        id: "tcpUser",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=96`,
        id: "tcpActThread",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=61`,
        id: "tcpReq",
      },
    ],
    tcpRow2: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=62`,
        id: "tcpThroughput",
      },
    ],

    hcRow1: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=68`,
        id: "hcUser",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=72`,
        id: "hcAvg",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=79`,
        id: "hcError",
      },
    ],
    hcRow2: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=100`,
        id: "hcTotalReq",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=99`,
        id: "hcFailedReq",
      },
    ],
    hcRow3: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=86`,
        id: "hcResp",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=97`,
        id: "hcThroughput",
      },
    ],
    hcRow4: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=74`,
        id: "hcErrps",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=94`,
        id: "hcErrInfo",
      },
    ],
  };

  const handleApplyTimeRange = (unixRange) => {
    setTimeRange(unixRange);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-between w-full h-screen px-0 py-14">
        <div className="flex flex-col gap-3 px-2 py-4 pb-8">
          <div className="flex flex-row items-center justify-between">
            <div> </div>
            <QuickRangesDropdown onApply={handleApplyTimeRange} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              {/* Summary Section */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-1 justify-items-center">
                  <h1 className={`text-3xl font-bold text-navy`}>HTTPS</h1>
                  <button
                    className="mt-1 text-md"
                    onClick={() => setShowSummary(!showSummary)}
                  >
                    {showSummary ? <DownOutlined /> : <DownOutlined />}
                  </button>
                </div>

                {showSummary && (
                  <div className="grid grid-flow-row-dense gap-3 grid-flow-cols">
                    <div className="grid gap-3 auto-cols-auto">
                      {panel.httpRow1.map(({ url, id }) => (
                        <MyIframe
                          key={id}
                          src={url}
                          id={id}
                          width="100%"
                          height="200"
                        />
                      ))}
                    </div>
                    <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-1">
                      {panel.httpRow2.map(({ url, id }) => (
                        <MyIframe
                          key={id}
                          src={url}
                          id={id}
                          width="100%"
                          height="200"
                        />
                      ))}
                    </div>
                    <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-1">
                      {panel.httpRow3.map(({ url, id }) => (
                        <MyIframe
                          key={id}
                          src={url}
                          id={id}
                          width="100%"
                          height="200"
                        />
                      ))}
                    </div>
                    <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-1">
                      {panel.httpRow4.map(({ url, id }) => (
                        <MyIframe
                          key={id}
                          src={url}
                          id={id}
                          width="100%"
                          height="200"
                        />
                      ))}
                    </div>
                    <div className="grid gap-3 auto-cols-auto">
                      {panel.httpRow5.map(({ url, id }) => (
                        <MyIframe
                          key={id}
                          src={url}
                          id={id}
                          width="100%"
                          height="300"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* TCP Section */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between mt-4">
                  <div className="flex flex-row items-center gap-1 justify-items-center">
                    <h1 className={`text-3xl font-bold text-navy`}>TCP</h1>
                    <button
                      className="mt-1 text-md"
                      onClick={() => setShowTCP(!showTCP)}
                    >
                      {showTCP ? <DownOutlined /> : <DownOutlined />}
                    </button>
                  </div>
                </div>
                {showTCP && (
                  <div className="grid grid-flow-row-dense gap-3 grid-flow-cols">
                    <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-1">
                      {panel.tcpRow1.map(({ url, id }) => (
                        <MyIframe
                          key={id}
                          src={url}
                          id={id}
                          width="100%"
                          height="180"
                        />
                      ))}
                    </div>

                    <div className="grid gap-3 auto-cols-auto ">
                      {panel.tcpRow2.map(({ url, id }) => (
                        <MyIframe
                          key={id}
                          src={url}
                          id={id}
                          width="100%"
                          height="300"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Health Check Section */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-1 justify-items-center">
                  <h1 className={`text-3xl font-bold text-navy`}>
                    Health Check
                  </h1>
                  <button
                    className="mt-1 text-md"
                    onClick={() => setShowHealthCheck(!showHealthCheck)}
                  >
                    {showHealthCheck ? <DownOutlined /> : <DownOutlined />}
                  </button>
                </div>
              </div>

              {showHealthCheck && (
                <div className="grid grid-flow-row-dense gap-3 grid-flow-cols">
                  <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-1">
                    {panel.hcRow1.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={url}
                        id={id}
                        width="100%"
                        height="200"
                      />
                    ))}
                  </div>
                  <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-1">
                    {panel.hcRow2.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={url}
                        id={id}
                        width="100%"
                        height="200"
                      />
                    ))}
                  </div>
                  <div className="grid gap-3 auto-cols-auto">
                    {panel.hcRow3.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={url}
                        id={id}
                        width="100%"
                        height="300"
                      />
                    ))}
                  </div>
                  <div className="grid gap-3 auto-cols-auto">
                    {panel.hcRow4.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={url}
                        id={id}
                        width="100%"
                        height="300"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
