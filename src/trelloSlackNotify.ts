import { createApiUrl } from './trello';
import getConfig from './getConfig';
import DoPost = GoogleAppsScript.Events.DoPost;
import DoGet = GoogleAppsScript.Events.DoGet;
import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
import HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse;

function doPost(evt: DoPost) {
  const postBody = evt.postData.contents;
  Logger.log(postBody);
  return HtmlService.createHtmlOutput(`<p>POST Request</p>`);
}

function doGet(evt: DoGet) {
  Logger.log(evt);
  return HtmlService.createHtmlOutput(`<p>Get Request</p>`);
}

function getConfigTest(propertyName: string) {
  return getConfig('c');
}

function createWebhook() {
  const appProps: AppProps = PropertiesService.getScriptProperties().getProperties();
  const WEBHOOK_CALLBACK_URL = getConfig('WEBHOOK_CALLBACK_URL');

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
