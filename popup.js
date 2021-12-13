// Initialize button with user's preferred color
let writeNoteButton = document.getElementById("writeNoteButton");
let writeNoteButtonStoys = document.getElementById("writeNoteButtonStoys");
let textareaMarks = document.getElementById("textareaMarks");






function responseMsg(res)
{
    $(".feedback").html("done");
}
chrome.storage.sync.get("marks", ({ marks }) => {
    textareaMarks.value=marks;
  });

var isCodeInjected=[];
writeNoteButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let textareaMarks = document.getElementById("textareaMarks");
    let marks=textareaMarks.value;
    chrome.storage.sync.set({ marks });

    if(!localStorage.getItem("isAlreadyInjected")){
        localStorage['isAlreadyInjected']=""+tab.id;

            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ["jquery.js","content.js"]
            },
            () => {
                chrome.tabs.sendMessage(
                        tab.id,
                        {marks:marks,event:"marksEokul"},
                        responseMsg
                )  

            });
        }
        else{
            if(!localStorage.getItem("isAlreadyInjected").split(" ").includes(tab.id)){
                localStorage['isAlreadyInjected']+=" "+tab.id;
            }

            chrome.tabs.sendMessage(
                tab.id,
                {marks:marks,event:"marksEokul"},
                responseMsg
            )  
            
        }
      
  });
  //STOYS
  //Select Column
  let ColumnNum=document.getElementById("colNum");
localStorage['isAlreadyInjected']="";
ColumnNum.addEventListener("input", async () => {
    writeNoteButtonStoys.disabled=false;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    let colNum=ColumnNum.value-1;
    chrome.storage.sync.set({ colNum });
    
    if(!localStorage.getItem("isAlreadyInjected")){
        localStorage['isAlreadyInjected']=""+tab.id;

            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ["jquery.js","content.js"]
            },
            () => {
                chrome.tabs.sendMessage(
                        tab.id,
                        {colNum:colNum,event:"colonneStoys"},
                        responseMsg
                )  

            });
        }
        else{
            if(!localStorage.getItem("isAlreadyInjected").split(" ").includes(tab.id)){
                localStorage['isAlreadyInjected']+=" "+tab.id;
            }

            chrome.tabs.sendMessage(
                tab.id,
                {colNum:colNum,event:"colonneStoys"},
                responseMsg
            )  
            
        }
      
  });

  //inject notes
  writeNoteButtonStoys.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let textareaMarks = document.getElementById("textareaMarks");
    let marks=textareaMarks.value;
    chrome.storage.sync.set({ marks });
    let colNum=ColumnNum.value-1;
    if(!localStorage.getItem("isAlreadyInjected")){
        localStorage['isAlreadyInjected']=""+tab.id;

            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ["jquery.js","content.js"]
            },
            () => {
                chrome.tabs.sendMessage(
                        tab.id,
                        {marks:marks,event:"marksStoys",colNum:colNum},
                        responseMsg
                )  

            });
        }
        else{
            if(!localStorage.getItem("isAlreadyInjected").split(" ").includes(tab.id)){
                localStorage['isAlreadyInjected']+=" "+tab.id;
            }

            chrome.tabs.sendMessage(
                tab.id,
                {marks:marks,event:"marksStoys",colNum:colNum},
                responseMsg
            )  
            
        }
      
  });
  