let startCount = 4;
let isStart = false;
let count = 0;
let time = 10000;
let mode = 10;

function changeSec(sec){
    if(isStart) return;

    mode = sec;
    time = mode*1000;
    timeCount.innerHTML = time/1000+".00";
}

function Click(){
    if(startCount==4) StartCount();        
    if(time<=0 || !isStart) return;

    clickCount.innerHTML = count+=1;       
}

function StartCount(){
    if(startCount==1) {
        clickButton.innerHTML = "狂點我!";
        isStart = true;
        TimeCount();   
        return;
    }

    clickButton.innerHTML = startCount-=1;  
    setTimeout(StartCount, 1000);
}

function TimeCount(){       
    time-=10; 
    timeCount.innerHTML = time <= 20 ? "0.00" : time/1000;  
    if(time<=20) clickButton.innerHTML = "時間到!!";
    if(time>0){       
        setTimeout(TimeCount, 10);    
        return;
    }
    Complate();
}

function Complate(){            
    const CPS = Math.round(count/mode * 10) / 10;
    const CPS_STR = CPS%1==0?CPS+".0":CPS;
    const Achievement = CPS<7?"在麥塊PVP界裡, 你只是個菜鳥...":CPS<9?"在麥塊PVP界裡, 你只是個普通人和大家差不多":CPS<11?"在麥塊PVP界裡, 你比普遍的人還強了呢!":CPS<14?"在麥塊PVP界裡, 你是位中高等級的玩家!":CPS<16?"在麥塊PVP界裡, 你已經是個高手了!!":CPS<20?"OMG... 在麥塊PVP界裡, 你是位菁英玩家啊!!!":"靠杯, 這一定不是你自己點出來的=_="                 
    alert("你的CPS為: "+CPS_STR+"\n\n"+Achievement);

    ResetAll();
    // location.reload();  
}

function ResetAll(){
    startCount = 4;           
    time = mode*1000;
    count = 0;  
    isStart = false;

    clickButton.innerHTML = "點我開始";
    clickCount.innerHTML = 0;  
    timeCount.innerHTML = time/1000+".00";     
}