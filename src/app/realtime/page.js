import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import MyIframe from "@/components/MyIframe";
import Header from "@/components/Header";
import ToggleSection from "@/components/ToggleSection";
import moment from "moment";
import { encryptURL } from "@/lib/encryption";

export const metadata = {
  title: "Dashboard",
  description: "DDos Dashboard by Playtorium",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  const GRAFANA_DASHBOARD_URL =
    "https://3c16t1t8l22k0u8p15b17k0z21p19h22l3t16k22u8p15t27.com:3777/d-solo/adu68f1hmk1s0h89/apache-jmeter-dashboard-v5?orgId=1";

  // Default time range (Last 1 hour)
  const timeRange = [
    moment().subtract(1, "hour").valueOf(),
    moment().valueOf(),
  ];

  const generatePanelUrl = (panelId) => {
    const url = `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${timeRange[0]}&to=${timeRange[1]}&panelId=${panelId}`;
    return encryptURL(url); // Encrypt the URL before sending to client
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

  if (!session) {
    return redirect("/login");
  }
  return (
    <>
      <Header />
      <main className="flex flex-col justify-between w-full h-screen px-6 py-14">
        <div className="flex flex-col gap-3 py-4 pb-8">
          <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
            <div className="flex flex-col gap-3">
              <ToggleSection title="HTTPS">
                <div className="grid grid-flow-row-dense gap-3 grid-flow-cols">
                  <div className="grid gap-3 auto-cols-auto">
                    {panel.httpRow1.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={`/api/iframe?token=${encodeURIComponent(url)}`}
                        id={id}
                        width="100%"
                        height="200"
                      />
                    ))}
                  </div>

                  <div className="grid gap-3 xl:grid-cols-2 md:grid-cols-1">
                    {panel.httpRow2.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={`/api/iframe?token=${encodeURIComponent(url)}`}
                        id={id}
                        width="100%"
                        height="200"
                      />
                    ))}
                  </div>

                  <div className="grid gap-3 xl:grid-cols-2 md:grid-cols-1">
                    {panel.httpRow3.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={`/api/iframe?token=${encodeURIComponent(url)}`}
                        id={id}
                        width="100%"
                        height="200"
                      />
                    ))}
                  </div>

                  <div className="grid gap-3 xl:grid-cols-3 md:grid-cols-1">
                    {panel.httpRow4.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={`/api/iframe?token=${encodeURIComponent(url)}`}
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
                        src={`/api/iframe?token=${encodeURIComponent(url)}`}
                        id={id}
                        width="100%"
                        height="300"
                      />
                    ))}
                  </div>
                </div>
              </ToggleSection>

              <div className="flex flex-col gap-2 mt-4">
                <ToggleSection title="TCP">
                  <div className="grid grid-flow-row-dense gap-3 grid-flow-cols">
                    <div className="grid gap-3 xl:grid-cols-3 md:grid-cols-1">
                      {panel.tcpRow1.map(({ url, id }) => (
                        <MyIframe
                          key={id}
                          src={`/api/iframe?token=${encodeURIComponent(url)}`}
                          id={id}
                          width="100%"
                          height="180"
                        />
                      ))}
                    </div>

                    <div className="grid gap-3 auto-cols-auto">
                      {panel.tcpRow2.map(({ url, id }) => (
                        <MyIframe
                          key={id}
                          src={`/api/iframe?token=${encodeURIComponent(url)}`}
                          id={id}
                          width="100%"
                          height="300"
                        />
                      ))}
                    </div>
                  </div>
                </ToggleSection>
              </div>
            </div>

            <div className="flex flex-col gap-2 ">
              <ToggleSection title="Health Check">
                <div className="grid grid-flow-row-dense gap-3 grid-flow-cols">
                  <div className="grid gap-3 xl:grid-cols-3 md:grid-cols-1">
                    {panel.hcRow1.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={`/api/iframe?token=${encodeURIComponent(url)}`}
                        id={id}
                        width="100%"
                        height="200"
                      />
                    ))}
                  </div>

                  <div className="grid gap-3 xl:grid-cols-2 md:grid-cols-1">
                    {panel.hcRow2.map(({ url, id }) => (
                      <MyIframe
                        key={id}
                        src={`/api/iframe?token=${encodeURIComponent(url)}`}
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
                        src={`/api/iframe?token=${encodeURIComponent(url)}`}
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
                        src={`/api/iframe?token=${encodeURIComponent(url)}`}
                        id={id}
                        width="100%"
                        height="300"
                      />
                    ))}
                  </div>
                </div>
              </ToggleSection>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
