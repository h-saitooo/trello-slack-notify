import { createApiUrl } from './trello';
import getConfig from './getConfig';
import fetchBoardChange from './fetchBoardChange';
import DoPost = GoogleAppsScript.Events.DoPost;
import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
import HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse;

function doPost(evt: DoPost) {
  const postBody: string = evt.postData.contents;
  Logger.log(postBody);

  fetchBoardChange(postBody);

  return HtmlService.createHtmlOutput(`<p>POST Request</p>`);
}

function createWebhook() {
  const appProps: AppProps = PropertiesService.getScriptProperties().getProperties();
  const WEBHOOK_CALLBACK_URL: string = getConfig('WEBHOOK_CALLBACK_URL');

  const requestOptions: URLFetchRequestOptions = {
    method: 'post',
    payload: {
      description: 'Trello Webhook',
    },
  };
  const response: HTTPResponse = UrlFetchApp.fetch(
    `${createApiUrl('webhooks')}?key=${appProps.TRELLO_API_KEY}&token=${
      appProps.TRELLO_TOKEN
    }&callbackURL=${WEBHOOK_CALLBACK_URL}&idModel=${appProps.TRELLO_BOARD_ID}`,
    requestOptions
  );

  Logger.log(response);

  return response;
}
