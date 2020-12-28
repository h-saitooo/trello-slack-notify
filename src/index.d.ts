interface AppProps {
  [key: string]: string;
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
