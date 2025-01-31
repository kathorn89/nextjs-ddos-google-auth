"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { DownOutlined } from "@ant-design/icons";
import { encryptURL } from "@/lib/encryption";

const TimeRangeFilter = dynamic(() => import("./TimeRangeFilter"), {
  ssr: false,
});

const MyIframe = dynamic(() => import("./MyIframe"), { ssr: false });

const GRAFANA_DASHBOARD_URL =
  "https://3c16t1t8l22k0u8p15b17k0z21p19h22l3t16k22u8p15t27.com/service1/d-solo/adu68f1hmk1s0h89/apache-jmeter-dashboard-v5?orgId=1";

export default function Page() {
  // Set default range to "Last 1 hour" (match server-rendered output)
  const [timeRange, setTimeRange] = useState([
    moment().subtract(1, "hour").valueOf(),
    moment().valueOf(),
  ]);

  // Update timeRange on the client side
  useEffect(() => {
    const defaultRange = [
      moment().subtract(1, "hour").valueOf(),
      moment().valueOf(),
    ];
    setTimeRange(defaultRange);
  }, []);

  // Visibility state for sections
  const [showSummary, setShowSummary] = useState(true);
  const [showTCP, setShowTCP] = useState(true);
  const [showHealthCheck, setShowHealthCheck] = useState(true);
  const [encryptedToken, setEncryptedToken] = useState("");

  // Encrypt the dashboard URL once when component mounts
  useEffect(() => {
    if (GRAFANA_DASHBOARD_URL) {
      const token = encryptURL(GRAFANA_DASHBOARD_URL);
      setEncryptedToken(token); // Set encrypted token
    }
  }, []);

  // Generate panel URLs dynamically
  const generatePanelUrl = (panelId) => {
    if (!timeRange || timeRange.length !== 2) {
      console.error("Invalid time range:", timeRange);
      return ""; // Handle invalid time range
    }

    return encryptURL(
      `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=${panelId}`
    );
  };

  const panel = {
    httpRow1: [
      {
        url: generatePanelUrl(31),
        id: "activeUser",
      },
    ],
    httpRow2: [
      {
        url: generatePanelUrl(26),
        id: "totalReq",
      },
      {
        url: generatePanelUrl(28),
        id: "failedReq",
      },
    ],
    httpRow3: [
      {
        url: generatePanelUrl(98),
        id: "successRate",
      },
      {
        url: generatePanelUrl(29),
        id: "errorRate",
      },
    ],
    httpRow4: [
      {
        url: generatePanelUrl(37),
        id: "tSentByte",
      },
      {
        url: generatePanelUrl(2),
        id: "tError",
      },
      {
        url: generatePanelUrl(4),
        id: "tThroughput",
      },
    ],
    httpRow5: [
      {
        url: generatePanelUrl(65),
        id: "avgResp",
      },
      {
        url: generatePanelUrl(36),
        id: "networkTff",
      },
    ],

    tcpRow1: [
      {
        url: generatePanelUrl(60),
        id: "tcpUser",
      },
      {
        url: generatePanelUrl(96),
        id: "tcpActThread",
      },
      {
        url: generatePanelUrl(61),
        id: "tcpReq",
      },
    ],
    tcpRow2: [
      {
        url: generatePanelUrl(62),
        id: "tcpThroughput",
      },
    ],

    hcRow1: [
      {
        url: generatePanelUrl(68),
        id: "hcUser",
      },
      {
        url: generatePanelUrl(72),
        id: "hcAvg",
      },
      {
        url: generatePanelUrl(79),
        id: "hcError",
      },
    ],
    hcRow2: [
      {
        url: generatePanelUrl(100),
        id: "hcTotalReq",
      },
      {
        url: generatePanelUrl(99),
        id: "hcFailedReq",
      },
    ],
    hcRow3: [
      {
        url: generatePanelUrl(86),
        id: "hcResp",
      },
      {
        url: generatePanelUrl(97),
        id: "hcThroughput",
      },
    ],
    hcRow4: [
      {
        url: generatePanelUrl(74),
        id: "hcErrps",
      },
      {
        url: generatePanelUrl(94),
        id: "hcErrInfo",
      },
    ],
  };

  const handleApplyTimeRange = (unixRange) => {
    setTimeRange(unixRange);
  };

  return (
    <>
      <main className="flex flex-col justify-around w-full h-screen px-0 py-16">
        <div className="flex flex-col gap-3 px-2 py-2 pb-8">
          <div className="flex flex-row items-center justify-between">
            <div> </div>
            <TimeRangeFilter onApply={handleApplyTimeRange} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              {/* Summary Section */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-1 justify-items-center">
                  <h1 className={`text-2xl font-bold text-navy`}>HTTPS</h1>
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
                          src={`/api/iframe?token=${url}`}
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
                          src={`/api/iframe?token=${url}`}
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
                          src={`/api/iframe?token=${url}`}
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
                          src={`/api/iframe?token=${url}`}
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
                          src={`/api/iframe?token=${url}`}
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
                    <h1 className={`text-2xl font-bold text-navy`}>TCP</h1>
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
                          src={`/api/iframe?token=${url}`}
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
                          src={`/api/iframe?token=${url}`}
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
                  <h1 className={`text-2xl font-bold text-navy`}>
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
                        src={`/api/iframe?token=${url}`}
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
                        src={`/api/iframe?token=${url}`}
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
                        src={`/api/iframe?token=${url}`}
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
                        src={`/api/iframe?token=${url}`}
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
