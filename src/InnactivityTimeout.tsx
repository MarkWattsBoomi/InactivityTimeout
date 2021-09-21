
import "./EventManager";
import "./InnactivityTimeout.css";

declare const manywho: any;
declare const iato: any;

export default class InactivityTimeout {
    timer: number = -1;
    timeoutSeconds: number = 6000;
    timeoutIntervalSeconds: number = 2000;
    warningSeconds: number = 60000;
    warningIntervalSeconds: number = 1000;
    timeoutSecondsRemaining: number;
    warningSecondsRemaining: number;
    
    uri: string;
    modal: any;
    msg: any;

    title: string;
    message: string;
    footer: string;
    debug: boolean;

    constructor() {
        this.moved=this.moved.bind(this);
        this.interval=this.interval.bind(this);
        this.activity=this.activity.bind(this);
        this.showPopup=this.showPopup.bind(this);
        this.hidePopup=this.hidePopup.bind(this);
        this.warningClicked=this.warningClicked.bind(this);
        (manywho as any).eventManager.addBeforeSendListener(this.moved, "iato");
        (manywho as any).eventManager.addDoneListener(this.moved, "iato");
        (manywho as any).eventManager.addJoinListener(this.moved, "iato");
        window.addEventListener("mousedown",this.activity);

        // read config vars
        if(iato){
            this.timeoutSeconds = iato.timeoutSeconds? parseInt("" + iato.timeoutSeconds) * 1000 : 5000;
            this.warningSeconds = iato.warningSeconds? parseInt("" + iato.warningSeconds) * 1000 : 60000;
            this.title = iato.title ? iato.title : "User Inactivity Detected";
            this.message = iato.message ? iato.message : "You will be logged out in {{#}} seconds";;
            this.footer = iato.footer ? iato.footer : "Click anywhere to cancel";
            this.uri = iato.redirectURI ? iato.redirectURI : undefined;
            this.debug = iato.debug ? iato.debug : false;
        }
        this.timeoutSecondsRemaining = this.timeoutSeconds;
        this.warningSecondsRemaining = this.warningSeconds;
        this.timer = window.setTimeout(this.interval,this.timeoutIntervalSeconds);
    }

    moved(xhr: any, request: any) {
        if(this.timer >=0) {
            window.clearTimeout(this.timer);
            this.timer = -1;
        }
        this.activity;
        this.timer = window.setTimeout(this.interval,this.timeoutIntervalSeconds);

    }

    activity() {
        this.timeoutSecondsRemaining = this.timeoutSeconds;
        this.warningSecondsRemaining=this.warningSeconds;
    }

    warningClicked(e: any) {
        this.timeoutSecondsRemaining = this.timeoutSeconds;
        this.warningSecondsRemaining=this.warningSeconds;
        this.interval();
    }

    interval(){
        window.clearTimeout(this.timer);
        this.timer = -1;
        
        if(this.timeoutSecondsRemaining > 0) {
            this.timeoutSecondsRemaining -= this.timeoutIntervalSeconds;
            this.warningSecondsRemaining=this.warningSeconds;
            this.timer = window.setTimeout(this.interval,this.timeoutIntervalSeconds);
            if(this.modal) {
                this.hidePopup();
            }
        }
        else {
            if(this.warningSecondsRemaining > 0) {
                this.warningSecondsRemaining -= this.warningIntervalSeconds;
                this.showPopup(this.warningSecondsRemaining);
                this.timer = window.setTimeout(this.interval,this.warningIntervalSeconds);
            }
            else {
                if(this.uri) {
                    window.open(this.uri,"_self");
                }
            } 
        }
    }

    showPopup(counter: number) {
        if(!this.modal) {
            let redaction: HTMLElement = document.createElement("div");
            redaction.id="__modal";
            redaction.className="iato-redaction";
            //redaction.addEventListener("click",this.warningClicked);
            
            let msgBox : HTMLElement = document.createElement("div");
            msgBox.className="iato-popup"

            let title: HTMLElement = document.createElement("span");
            title.className="iato-popup-message";
            title.innerHTML=this.title;
            msgBox.appendChild(title);

            let message: HTMLElement = document.createElement("span");
            message.className="iato-popup-text";
            message.innerHTML=this.message.replace("{{#}}", ""+(counter / 1000));
            this.msg = message;
            msgBox.appendChild(message);

            let footer: HTMLElement = document.createElement("span");
            footer.className="iato-popup-footer";
            footer.innerHTML=this.footer;
            msgBox.appendChild(footer);

            redaction.appendChild(msgBox);
            this.modal = redaction;
            
            document.getElementsByTagName("body")[0].appendChild(redaction);
        }
        else {
            this.msg.innerHTML=this.message.replace("{{#}}", ""+(counter / 1000));
        }
    }

    hidePopup() {
        if(this.modal){
            document.getElementsByTagName("body")[0].removeChild(this.modal);
            this.modal = undefined;
        }
    }
        

    
}

(manywho as any).iato = new InactivityTimeout();


