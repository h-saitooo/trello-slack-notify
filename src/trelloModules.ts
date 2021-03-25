import { getConfig } from './getInSheetConfig';
import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
import HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse;

export function createApiUrl(apiGroup: ApiGroup) {
  return `https://api.trello.com/1/${apiGroup}/`;
}

export function getMemberId(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const requestOptions: URLFetchRequestOptions = {
      method: 'get',
    };

    const response: HTTPResponse = UrlFetchApp.fetch(
      `${createApiUrl('members')}${username}/?key=${getConfig(
        'TRELLO_API_KEY'
      )}&token=${getConfig('TRELLO_TOKEN')}`,
      requestOptions
    );

    try {
      if (response.getResponseCode() === 200) {
        const memberData = JSON.parse(response.getContentText());
        resolve(memberData);
      } else {
        throw new Error('Response status not 200');
      }
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
      reject(error);
    }
  });
}
