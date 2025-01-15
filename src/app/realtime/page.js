import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import MyIframe from "@/components/MyIframe";
import Header from "@/components/Header";
import ToggleSection from "@/components/ToggleSection";

export const metadata = {
  title: "Dashboard",
  description: "DDos Dashboard by Playtorium",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  const GRAFANA_DASHBOARD_URL =
    "http://13.228.191.154:3777/d-solo/adu68f1hmk1s0h90/apache-jmeter-dashboard-v5?orgId=1";

  const panel = {
    httpRow1: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=31`,
        id: "activeUser",
      },
    ],
    httpRow2: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=26`,
        id: "totalReq",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=28`,
        id: "failedReq",
      },
    ],
    httpRow3: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=98`,
        id: "successRate",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=29`,
        id: "errorRate",
      },
    ],
    httpRow4: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=37`,
        id: "tSentByte",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=2`,
        id: "tError",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=4`,
        id: "tThroughput",
      },
    ],
    httpRow5: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=65`,
        id: "avgResp",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=36`,
        id: "networkTff",
      },
    ],

    tcpRow1: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=60`,
        id: "tcpUser",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=96`,
        id: "tcpActThread",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=61`,
        id: "tcpReq",
      },
    ],
    tcpRow2: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=62`,
        id: "tcpThroughput",
      },
    ],

    hcRow1: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=68`,
        id: "hcUser",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=72`,
        id: "hcAvg",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=79`,
        id: "hcError",
      },
    ],
    hcRow2: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=100`,
        id: "hcTotalReq",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=99`,
        id: "hcFailedReq",
      },
    ],
    hcRow3: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=86`,
        id: "hcResp",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=97`,
        id: "hcThroughput",
      },
    ],
    hcRow4: [
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=74`,
        id: "hcErrps",
      },
      {
        url: `${GRAFANA_DASHBOARD_URL}&}&refresh=5s&from=now-1h&to=now&panelId=94`,
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
      <main className="flex flex-col items-center justify-between w-full h-screen px-6 py-14">
        <div className="flex flex-col gap-3 py-4 pb-8">
          <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
            <div className="flex flex-col gap-3">
              <ToggleSection title="HTTPS">
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

                  <div className="grid gap-3 xl:grid-cols-2 md:grid-cols-1">
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

                  <div className="grid gap-3 xl:grid-cols-2 md:grid-cols-1">
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

                  <div className="grid gap-3 xl:grid-cols-3 md:grid-cols-1">
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
              </ToggleSection>

              <div className="flex flex-col gap-2 mt-4">
                <ToggleSection title="TCP">
                  <div className="grid grid-flow-row-dense gap-3 grid-flow-cols">
                    <div className="grid gap-3 xl:grid-cols-3 md:grid-cols-1">
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

                    <div className="grid gap-3 auto-cols-auto">
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
                        src={url}
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
              </ToggleSection>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
