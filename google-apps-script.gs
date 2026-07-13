/**
 * Bellagio Beach Resort — Feedback → Google Sheet logger
 * ---------------------------------------------------------
 * SETUP:
 * 1. Go to https://sheets.google.com and create a new spreadsheet
 *    (or open the one you want to log feedback into).
 * 2. In the sheet, add this header row in row 1:
 *    Timestamp | Room | Phone | Reception | Rooms | Food | Cleanliness | Staff | Beach | Average | Comment | Language
 * 3. In the sheet menu: Extensions → Apps Script.
 * 4. Delete any placeholder code in the editor and paste this entire file instead.
 * 5. Click Deploy → New deployment.
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: anything, e.g. "Feedback logger".
 *    - Execute as: Me.
 *    - Who has access: Anyone.
 * 6. Click Deploy, authorize the script when Google asks (it's your own script/sheet).
 * 7. Copy the "Web app URL" you're given — it looks like:
 *    https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXX/exec
 * 8. Paste that URL into script.js, replacing the value of SHEET_WEBHOOK_URL.
 * 9. If you ever edit this script again, use Deploy → Manage deployments → Edit → New version,
 *    otherwise the live URL keeps running the old code.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = {};

  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = {};
  }

  sheet.appendRow([
    new Date(),
    data.room || "",
    data.phone || "",
    data.reception || "",
    data.rooms || "",
    data.food || "",
    data.cleanliness || "",
    data.staff || "",
    data.beach || "",
    data.average || "",
    data.comment || "",
    data.lang || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
