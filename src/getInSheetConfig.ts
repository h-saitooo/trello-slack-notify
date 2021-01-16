import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;

export function getConfig(keyName: string) {
  const spreadsheet: Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet: Sheet | null = spreadsheet.getSheetByName('Setting');

  if (configSheet === null) return null;
  const range: Range = configSheet.getDataRange();
  const rangeValues = range.getValues();

  for (let i = 0; i < rangeValues.length; i++) {
    const key = rangeValues[i][0];
    if (key === keyName) {
      return rangeValues[i][1];
      break;
    }
  }

  return null;
}

export function convertUsername(
  username: string,
  convertFrom: 'label' | 'trello' | 'trelloId' | 'slack' = 'trello',
  convertTo: 'label' | 'trello' | 'slack' = 'slack'
): string | null {
  const spreadsheet: Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const usersListSheet: Sheet | null = spreadsheet.getSheetByName('Users');
  // 0: User Label (not use)
  // 1: Slack Username
  // 2: Trello Username
  // 3: Trello User Id
  const columuPosition = { label: 0, slack: 1, trello: 2, trelloId: 3 };

  if (usersListSheet === null) return null;

  const range: Range = usersListSheet.getDataRange();
  const rangeValues = range.getValues();
  const searchCol = columuPosition[convertFrom];
  const targetCol = columuPosition[convertTo];

  for (let i = 0; i < rangeValues.length; i++) {
    const itrValue: string = rangeValues[i][searchCol];
    if (itrValue === username) {
      return rangeValues[i][targetCol];
      break;
    }
  }

  return null;
}
