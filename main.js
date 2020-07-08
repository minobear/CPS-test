let startCount = 4;
let isStart = false;
let count = 0;
let time = 10000;
let mode = 10;
let buttonSize = 50;
let buttonRed = 0;
let leaderboard = []

leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
leaderboard = leaderboard == null ? [] : leaderboard;
setTimeout(refreshLeaderboard, 1);

function changeSec(sec){
    let timeCount = document.getElementById("timeCount");

    if(isStart) return;

    mode = sec;
    time = mode*1000;
    timeCount.innerHTML = time/1000+".00";
}

function Click(){
    let clickCount = document.getElementById("clickCount");
    let clickButton = document.getElementById("clickButton");

    buttonSize+=0.1;
    buttonRed+=1;
    let buttonSizeStr = buttonSize+"px";

    if(startCount==4) StartCount();        
    if(time<=0 || !isStart) return;

    clickCount.innerHTML = count+=1;   
    clickButton.style.fontSize = buttonSizeStr;
    clickButton.style.color = "rgb("+buttonRed+",0,0)";
}

function StartCount(){
    let clickButton = document.getElementById("clickButton");

    if(startCount==1) {
        clickButton.innerHTML = "狂點我!";
        isStart = true;       
        TimeCount();   
        return;
    }

    clickButton.style.color = "black";
    clickButton.innerHTML = startCount-=1;     
    setTimeout(StartCount, 1000);
}

function TimeCount(){ 
    let timeCount = document.getElementById("timeCount");
    
    time-=10; 
    timeCount.innerHTML = time <= 20 ? "0.00" : time/1000;  
    if(time<=20) {
        clickButton.innerHTML = "時間到!!";
        clickButton.style.fontSize = "50px";
        clickButton.style.color = "black"; 
    }
    if(time>0){       
        setTimeout(TimeCount, 10);    
        return;
    }
    Complate();
}

function Complate(){            
    const CPS = Math.round(count/mode * 10) / 10;
    const CPS_STR = CPS%1==0?CPS+".0":CPS;
    const Achievement = CPS<7?"在麥塊PVP界裡, 你只是個菜鳥...":CPS<9?"在麥塊PVP界裡, 你只是個普通人和大家差不多":CPS<11?"在麥塊PVP界裡, 你比普遍的人還強了呢!":CPS<15?"在麥塊PVP界裡, 你是位中高等級的玩家!":CPS<18?"在麥塊PVP界裡, 你已經是個高手了!!":CPS<25?"OMG... 在麥塊PVP界裡, 你是位菁英玩家啊!!!":"靠杯, 這一定不是你自己點出來的=_="                 
    alert("你的CPS為: "+CPS_STR+"\n\n"+Achievement);
    leaderboard.push({used_time: mode, cps: CPS_STR})
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard))

    refreshLeaderboard();
    ResetAll();
    // location.reload();  
}

function refreshLeaderboard(){  
    if(leaderboard == null) return;

    $("table").empty();
    $("table").append("<tr><td>CPS</td> <td>使用秒數</td></tr>")
    for(let i=0; i<leaderboard.length; i++){
        for(let j=0; j<leaderboard.length-1; j++){
            if (parseFloat(leaderboard[j].cps) < parseFloat(leaderboard[j+1].cps)){
                let temp = leaderboard[j];
                leaderboard[j] = leaderboard[j+1];
                leaderboard[j+1] = temp;
            }
        }
    }

    leaderboard.forEach(function(data) {
        $("table").append("<tr><td>"+data.cps+"</td> <td>"+data.used_time+"</td></tr>")
    })
    $("leaderboard")
}

function ResetAll(){
    startCount = 4;           
    time = mode*1000;
    count = 0;  
    buttonSize = 50;
    buttonRed = 0;
    isStart = false;

    clickButton.innerHTML = "點我開始";
    clickCount.innerHTML = 0;  
    timeCount.innerHTML = time/1000+".00";  
}