//to calendar id
var outCal_id = "kanhigh1110@gmail.com";
//from calendar id
var inCal_ids = [
　　　　"hiroshi.yamamoto@bitkey.jp"];
//title prefix
var prefix = "BKP："
function main(){

　　　　var month = 1;  
　　　　var date_start = new Date();
　　　　var date_end = new Date;
　　　　date_end.setTime(date_start.getTime() + month*30*24*60*60*1000);
　　　　var outCal = CalendarApp.getCalendarById(outCal_id);
　　　　var old_Future_Ev = outCal.getEvents(date_start,date_end);
　　　　for(var i = 0; i < old_Future_Ev.length;i++){
      var title = old_Future_Ev[i].getTitle();
      if (title.indexOf(prefix) !== 0){
        old_Future_Ev[i].deleteEvent();
      }
　　　　}	     
　　　　for(var i = 0; i < inCal_ids.length; i++){
  　　　　mergeCal(outCal, inCal_ids[i], date_start, date_end);
  }
}
function mergeCal(outCal, inCal_id, date_start, date_end) {
    var inCal = CalendarApp.getCalendarById(inCal_id);
    var new_Future_Ev = inCal.getEvents(date_start,date_end);
    for(var i = 0; i < new_Future_Ev.length;i++){
      Utilities.sleep(1);
      if(new_Future_Ev[i].isAllDayEvent()){
        outCal.createAllDayEvent(prefix + new_Future_Ev[i].getTitle(),
	    new_Future_Ev[i].getStartTime(),
	    new_Future_Ev[i].getEndTime(), 
	    {description:new_Future_Ev[i].getDescription(),
	    　　location:new_Future_Ev[i].getLocation()});
      }　else　{
	    outCal.createEvent(prefix + new_Future_Ev[i].getTitle(),
	    new_Future_Ev[i].getStartTime(),
	    new_Future_Ev[i].getEndTime(),
	    {description:new_Future_Ev[i].getDescription(),
	     location:new_Future_Ev[i].getLocation()});
      }
    }
}
