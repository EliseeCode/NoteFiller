
function fillInMarksEokul(marks) {
    console.log(marks);
    marksArr=marks.split('\n');
    //window.alert(marksArr);
    let mark;
    inputs=$('#dgListem').find("input[type=text]");
    for(let k=0;k<inputs.length && k<marksArr.length;k++)
    {
        mark=marksArr[k];
        inputs[k].value=mark;
    }
}
function fillInMarksStoys(marks,colNum) {
  console.log(marks);
  marksArr=marks.split('\n');
  //window.alert(marksArr);
  let mark;
  let lineNum=0;
  $("#pointsentrytable").find("input[type=text]").css('background-color',"white");
  $("#pointsentrytable").find("tr").each(function() {

    
    if($( this ).find('input[type=text]').eq(colNum).length!=0 && lineNum<marksArr.length){
      $( this ).find('input[type=text]').eq(colNum).val(marksArr[lineNum]);
      lineNum++;}
  });
  for(let k=0;k<inputs.length && k<marksArr.length;k++)
  {
      mark=marksArr[k];
      inputs[k].value=mark;
  }
}
function highLightCol(num)
{
  $("#pointsentrytable").find("input[type=text]").css('background-color',"white");
  var line=$("#pointsentrytable").find("tr").each(function() {
    $( this ).find('input[type=text]').eq(num).css('background-color',"pink");
  });
}
chrome.runtime.onMessage.addListener((media, sender, sendResponse) => {
    //console.log("event received:"+media);
    if (media.event === 'marksEokul') {
      marks=media.marks;
      console.log("event marksEokul",marks);
      fillInMarksEokul(marks);
      sendResponse({msg:"ok"})
    }
    if (media.event === 'marksStoys') {
      marks=media.marks;
      colNum=media.colNum;
      console.log("event marksStoys",marks,colNum);
      fillInMarksStoys(marks,colNum);
      sendResponse({msg:"ok"})
    }
    if (media.event === 'colonneStoys') {
      colNum=media.colNum;
      console.log("event colonneStoys",colNum);
      highLightCol(colNum);
      sendResponse({msg:"ok"})
    }
  })


//isbn = document.getElementById("f_cb").value;
//fillInPNB(isbn);


    
  

