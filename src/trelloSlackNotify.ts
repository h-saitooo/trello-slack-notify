import { createApiUrl, getMemberId } from './trelloModules';
import { getConfig } from './getInSheetConfig';
import { fetchBoardChange } from './fetchBoardChange';
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import SpreadsheetApp = GoogleAppsScript.Spreadsheet.SpreadsheetApp;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;
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

async function getTrelloMemberId() {
  const spreadsheet: Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const usersListSheet: Sheet | null = spreadsheet.getSheetByName('Users');
  const usernameCol = 2;
  const apiIdCol = 3;

  if (usersListSheet === null) return null;

  const range: Range = usersListSheet.getDataRange();
  const rangeValues = range.getValues();

  for (let i = 0; i < rangeValues.length; i++) {
    const itrValue = rangeValues[i][apiIdCol];
    if (itrValue !== '') continue;

    const memberId: string = getTrelloMemberId(rangeValues[i][usernameCol]);
    usersListSheet.getRange(i, usernameCol).setValue(memberId);

    Logger.log(`
      Username: ${itrValue[i][usernameCol]},
      UserId:  ${memberId}
    `);
  }
}
