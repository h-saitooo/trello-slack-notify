import { getConfig } from './getInSheetConfig';
import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
import HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse;

export function createApiUrl(apiGroup: ApiGroup) {
  return `https://api.trello.com/1/${apiGroup}/`;
}

export async function getMemberId(username: string) {
  const requestOptions: URLFetchRequestOptions = {
    method: 'get',
  };
  const response: HTTPResponse = await UrlFetchApp.fetch(
    `${createApiUrl('members')}${username}/?key=${getConfig(
      'TRELLO_API_KEY'
    )}&token=${getConfig('TRELLO_TOKEN')}`,
    requestOptions
  );
  const memberData = JSON.parse(response.getContentText());

  return memberData.id;
}
