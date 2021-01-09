interface AppProps {
  [key: string]: string;
}

declare namespace TrelloWebhook {
  namespace Action {
    interface WebhookResponse {
      model?: { [key: string]: any };
      action: TrelloActionData;
    }

    interface ActionBody {
      type: ActionType;
      data: ActionData;
      memberCreator: MemberCreator;
      [key: string]: string | { [key: string]: any } | boolean;
    }

    interface ActionData {
      old?: ActionOld;
      card: ActionCard;
      list?: ActionList;
      Board: ActionBoard;
      listBefore?: ActionListBefore;
      listAfter?: ActionListAfter;
    }

    type ActionType = 'createCard' | 'updateCard';

    interface MemberCreator {
      id: string;
      username: string;
      activityBlocked: boolean;
      avatarHash: string;
      avatarUrl: string;
      fullName: string;
      idMemberReferrer: string | null;
      initials: string;
      nonPublic: { [key: string]: any };
      nonPublicAvailable: boolean;
    }

    interface ActionOld {
      [key: string]: string;
    }
    interface ActionCard {
      idList?: string;
      name: string;
      idShort: Integer;
      shortLink: string;
    }
    interface ActionList {
      id: string;
      name: string;
    }
    interface ActionBoard {
      id: string;
      name: string;
      shortLink: string;
    }
    interface ActionListBefore {
      id: string;
      name: string;
    }
    interface ActionListAfter {
      id: string;
      name: string;
    }
  }
}

type ApiGroup =
  | 'actions'
  | 'boards'
  | 'cards'
  | 'checklists'
  | 'customFields'
  | 'labels'
  | 'lists'
  | 'members'
  | 'plugins'
  | 'search'
  | 'tokens'
  | 'webhooks';

interface SLACK_WEBHOOK_PAYLOAD {
  channel?: string;
  username?: string;
  icon_emoji?: string;
  text: string;
}
