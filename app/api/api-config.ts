
export const API_CONFIG = {
  baseUrl: "https://shbcdc.in/HIS/API/MobileApplication.asmx",
  SecurityKey: "XZY45ZTYLG19045GHTY",
  ClientId: "XZY45ZTBNG190489GHTY",
};
export function buildApiUrl(
  endpoint: string,
  params: Record<string, string> = {}
): string {
  const url = new URL(`${API_CONFIG.baseUrl}/${endpoint}`);

  url.searchParams.set("SecurityKey", API_CONFIG.SecurityKey);
  url.searchParams.set("ClientId", API_CONFIG.ClientId);
 
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  
  return url.toString();
}

export function parseXmlResponse(text: string): any {
  let jsonString = text;
  
  if (text.includes("<?xml")) {
    const match = text.match(/<string[^>]*>([\s\S]*?)<\/string>/);
    if (match && match[1]) {
      jsonString = match[1];
    }
  }
  
  return JSON.parse(jsonString);
}

export async function callApi(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const url = buildApiUrl(endpoint, params);
  
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const text = await response.text();
  return parseXmlResponse(text);
}