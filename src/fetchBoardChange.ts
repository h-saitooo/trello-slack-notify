import { convertUsername } from './getInSheetConfig';
import UrlFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
import HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse;

export function fetchBoardChange(postBody: string): void {
  const actionData: TrelloWebhook.Action.WebhookResponse = JSON.parse(postBody);
  const actionType: TrelloWebhook.Action.ActionType = actionData.action.type;
  const card: TrelloWebhook.Action.ActionCard = {
    id: actionData.action.data.card.id,
    name: actionData.action.data.card.name,
    shortLink: actionData.action.data.card.shortLink,
  };

  // カード状態変更
  if (actionType === 'updateCard') updateCard(card, actionData);
}

function updateCard(
  card: TrelloWebhook.Action.ActionCard,
  actionData: TrelloWebhook.Action.WebhookResponse
): boolean {
  const action: TrelloWebhook.Action.ActionBody = actionData.action;

  if (!action.data.old.idList) {
    Logger.log('This update is not card move');
    return false;
  }

  const moveExecutorId: string = action.memberCreator.id;
  const listBeforeName: string = action.data.listBefore.name;
  const listAfterName: string = action.data.listAfter.name;
  const cardUrl = `https://trello.com/c/${card.shortLink}/`;
  const postText = `カード *<${cardUrl}|${
    card.name
  }>* が「${listBeforeName}」から「${listAfterName}」へ「@${convertUsername(
    moveExecutorId,
    'trelloId',
    'slack'
  )}さん」によって移動されました。`;

  toSlackPost(postText);
  return true;
}

function createCard(
  card: TrelloWebhook.Action.ActionCard,
  actionData: TrelloWebhook.Action.WebhookResponse
) {
  const action: TrelloWebhook.Action.ActionBody = actionData.action;
}

function toSlackPost(postText: string): HTTPResponse {
  const appProps: AppProps = PropertiesService.getScriptProperties().getProperties();
  const postUrl: string = appProps.SLACK_WEBHOOK_URL;
  const payload: SLACK_WEBHOOK_PAYLOAD = {
    channel: '#home',
    text: postText,
    parse: 'none',
    as_user: true,
  };

  const requestOptions: UrlFetchRequestOptions = {
    method: 'post',
    payload: JSON.stringify(payload),
  };

  const response: HTTPResponse = UrlFetchApp.fetch(postUrl, requestOptions);
  Logger.log(response);

  return response;
}
