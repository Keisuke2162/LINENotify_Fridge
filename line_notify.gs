function myReminder() {
  //アクティブシートを選択
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  //最終行を取得
  var lastRow = activeSheet.getLastRow();
  var lastColum = activeSheet.getLastColumn();
  
  //Cellの内容を取得
  var cellValues = activeSheet.getRange(1, 1, lastRow, lastColum).getValues();
  
  //表示文章
  var sentence = "";
  
  //取得したデータを分解
  for (let i = 1; i < cellValues.length; i ++) {
    
    var name = cellValues[i][0];
    
    //購入日付作成
    var date = new Date(cellValues[i][1]);
    var buyDate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM/dd');
    
    //消費期限作成
    var date = new Date(cellValues[i][2]);
    var limitDate = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM/dd');
    
    var amount = cellValues[i][3];
    
    //商品情報を1文にまとめる
    sentence += "\n " + String(name) + "\n 消費期限 : " + String(limitDate) + " 個数 : " + String(amount) + "\n";
    
  }
  
  //データがなければその旨を通知
  if (sentence　== "") {
    sendHttpPost("冷蔵庫は空です。")
  }
  
  //Logger.log(sentence);
  sendHttpPost(sentence);
}


//LINE Notifyを使用するための処理
function sendHttpPost(content) {
  
  //通知用の宛先トークン
  var token = ['LINE Notify トークン'];
  
  var options =
      {
        "method" : "post",
        "payload" : { "message" : content,
                    },
        "headers" : {"Authorization" : "Bearer " + token}
      };
  
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}
