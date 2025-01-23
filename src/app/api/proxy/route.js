// File: app/api/proxy/route.js
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const panelId = searchParams.get("panelId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const GRAFANA_DASHBOARD_URL =
    "https://3c16t1t8l22k0u8p15b17k0z21p19h22l3t16k22u8p15t27.com:3777/d-solo/adu68f1hmk1s0h89/apache-jmeter-dashboard-v5?orgId=1";

  if (!panelId || !from || !to) {
    return new Response(
      JSON.stringify({ error: "Missing required query parameters" }),
      { status: 400 }
    );
  }

  const proxyUrl = `${GRAFANA_DASHBOARD_URL}&refresh=5s&from=${from}&to=${to}&panelId=${panelId}`;

  try {
    const response = await axios.get(proxyUrl, {
      responseType: "stream",
      timeout: 20000, // 10 seconds
    });

    return new Response(response.data, {
      headers: {
        "Content-Type": response.headers["content-type"],
      },
    });
  } catch (error) {
    console.error("Proxy Error:", {
      message: error.message,
      code: error.code,
      url: proxyUrl,
      status: error.response?.status,
      data: error.response?.data,
    });

    return new Response(
      JSON.stringify({
        error: "Failed to fetch data from Grafana",
        details: error.message,
      }),
      { status: error.response?.status || 500 }
    );
  }
}
