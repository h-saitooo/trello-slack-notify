import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;

export default function getConfig(keyName: string) {
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
