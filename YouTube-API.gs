/**
 * Searches for videos about games, then logs the video IDs and title.
 * Note that this sample limits the results to 50. 
 */
// onOpen is run every time the document is opened (spreadsheet)
function  onOpen ( )  {
  // The user interface is obtained
  var  ui  =  SpreadsheetApp . getUi ( ) ;
  // The two menu options are added
  ui . createMenu ( 'Menu Youtube' )
      . addItem ( 'Load Data' ,  'searchByKeyword' )
      . addToUi ( ) ;
}

function searchByKeyword() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  //start getting search results from 3rd row.
  var row_video = 3;
  var row_channel = 3;
  //Youtube Search API to get the list of top game players based on name of the game.
  var results = YouTube.Search.list('id,snippet', {
    q: 'Era of legends gameplay',
    maxResults: 50
  }); 
  
  //Parse list of results to get video name, channel name, channel URL.
  for(var i in results.items){
      Logger.log('Title: %s Channel Title: %s ', results.items[i].snippet.title, results.items[i].snippet.channelTitle);
    var details = [[results.items[i].snippet.title, results.items[i].snippet.channelTitle, 'https://www.youtube.com/channel/'+results.items[i].snippet.channelId]];
      var range=sheet.getRange(row_video++,1,1,3);
      range.setValues(details);
  }

  //Get more Youtube Channel details from channelId.
  results.items.forEach(function(item) {
        
    var stat = YouTube.Channels.list('id,snippet,statistics,contentOwnerDetails', {
      id: item.snippet.channelId
          });
    //Parse list of statistics to save more details to spreadsheet.
    for(var i in stat.items){
      var details = [[stat.items[i].statistics.subscriberCount, stat.items[i].statistics.videoCount, stat.items[i].statistics.viewCount]];
      var range=sheet.getRange(row_channel++,4,1,3);
      range.setValues(details);
    
    }
  });
  
  
}
