import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
import HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse;

export function createApiUrl(apiGroup: ApiGroup) {
  return `https://api.trello.com/1/${apiGroup}/`;
}

export function getBorad(Props: AppProps) {
  const API_KEY: string = Props.TRELLO_API_KEY;
  const TOKEN: string = Props.TRELLO_TOKEN;

  const requestOptions: URLFetchRequestOptions = {
    method: 'get',
    headers: {
      Accept: 'application/json',
    },
  };

  const response: HTTPResponse = UrlFetchApp.fetch(
    `${createApiUrl('actions')}/noppo_hf?key=${API_KEY}&${TOKEN}`,
    requestOptions
  );

  return response;
}
