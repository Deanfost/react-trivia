(this["webpackJsonpreact-trivia"]=this["webpackJsonpreact-trivia"]||[]).push([[0],[,,,,,,,,,,,function(e,t,n){e.exports=n(29)},,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),s=n.n(i),c=(n(16),n(6)),o=n.n(c),l=n(9),u=n(2),m=n(3),h=n(1),d=n(5),p=n(4),f=(n(18),n(19),function(e){return r.a.createElement("nav",{className:"Nav"},r.a.createElement("p",{className:"Nav__Title"},"Trivia!"),r.a.createElement("div",{className:"Nav__Button",onClick:e.onClick},r.a.createElement("ion-icon",{name:"close"})))}),v=n(10),g=n.n(v),b=(n(20),n(21),function(e){var t=null;if(e.hasTimer){var n=String(Math.ceil(e.timeRemaining)).padStart(2,"0"),a=e.timeRemaining<=0?"Question__Timer--Incorrect":"Question__Timer--Neutral";t=r.a.createElement("h1",{className:a},n)}return r.a.createElement("div",{className:"Question"},r.a.createElement("div",{className:"Question__Header"},r.a.createElement("h1",null,"Question ",e.questionNumber),t),r.a.createElement("p",{className:"Question__Prompt"},e.questionPrompt))});b.defaultProps={hasTimer:!1};var E=b,_=(n(22),function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).handleOptionChosen=a.handleOptionChosen.bind(Object(h.a)(a)),a}return Object(m.a)(n,[{key:"handleOptionChosen",value:function(e){this.props.onAnswer(e)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"AnswerPane"},this.props.choiceList.map((function(t,n){return r.a.createElement(w,{key:e.props.choiceIDs[n],choice:t,isCorrect:n===e.props.correctIndex,shouldReveal:e.props.answered,onChosen:e.handleOptionChosen})})))}}]),n}(r.a.Component)),w=function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={chosen:!1},a.handleClick=a.handleClick.bind(Object(h.a)(a)),a}return Object(m.a)(n,[{key:"handleClick",value:function(){this.props.shouldReveal||(this.props.onChosen(this.props.isCorrect),this.setState({chosen:!0}))}},{key:"render",value:function(){var e=this.props.shouldReveal,t=this.props.isCorrect,n="AnswerPane__Choice";return e||(n+=" AnswerPane__Choice--Enabled"),e&&t?n+=" AnswerPane__Choice--Correct":e&&!t&&this.state.chosen&&(n+=" AnswerPane__Choice--Incorrect"),r.a.createElement("div",{className:n,onClick:this.handleClick},r.a.createElement("p",null,this.props.choice))}}]),n}(r.a.Component),k=_,C=(n(23),function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).fillRef=r.a.createRef(),a}return Object(m.a)(n,[{key:"render",value:function(){var e=String(Math.ceil(this.props.timeRemaining)).padStart(2,"0"),t="ProgressBar__Timer";return this.props.timeRemaining<=0&&(t+=" ProgressBar__Timer--End"),r.a.createElement("div",{className:"ProgressBar"},r.a.createElement("p",{className:t},"0:",e),r.a.createElement("div",{className:"ProgressBar__Bar"},r.a.createElement("div",{className:"ProgressBar__Fill",ref:this.fillRef})))}},{key:"componentDidUpdate",value:function(){var e=this.fillRef.current,t=(this.props.allotedTime-this.props.timeRemaining)/this.props.allotedTime;t=(t*=100).toFixed(3),e.setAttribute("style","width: ".concat(t,"%"))}}]),n}(r.a.Component)),N=(n(24),function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).activeItemRef=r.a.createRef(),a.trackerRef=r.a.createRef(),a}return Object(m.a)(n,[{key:"render",value:function(){for(var e=this,t=[],n=0;n<this.props.questionCount;n++)if(n>=this.props.runningResults.length)t.push({number:n+1,isActive:n+1===this.props.currNumber,wasAnswered:!1});else{var a=n+1<this.props.currNumber||n+1===this.props.currNumber&&this.props.currWasAnswered;t.push({number:n+1,isActive:n+1===this.props.currNumber,wasAnswered:a,wasCorrect:this.props.runningResults[n]})}return r.a.createElement("aside",{className:"Tracker",ref:this.trackerRef},t.map((function(t){return r.a.createElement(O,Object.assign({},t,{refProp:e.activeItemRef}))})))}},{key:"componentDidUpdate",value:function(){var e=this.activeItemRef.current,t=this.trackerRef.current,n=e.getBoundingClientRect(),a=t.getBoundingClientRect();if(n.right>a.right){var r=n.right-a.right;t.scrollLeft+=r}}}]),n}(r.a.Component)),O=function(e){var t="Tracker__Item";return e.isActive&&!e.wasAnswered?t+=" Tracker__Item--Active":e.wasAnswered&&e.wasCorrect?t+=" Tracker__Item--Correct":e.wasAnswered&&!e.wasCorrect?t+=" Tracker__Item--Incorrect":t+=" Tracker__Item--Unvisited",r.a.createElement("div",{className:t,ref:e.isActive?e.refProp:null},r.a.createElement("p",null,"Q",e.number),e.isActive&&r.a.createElement("div",{className:"Tracker__Tab"}))},T=N,j=function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={runningResults:[]},a.getNextQuestionState=a.getNextQuestionState.bind(Object(h.a)(a)),a.handleQuestionAnswered=a.handleQuestionAnswered.bind(Object(h.a)(a)),a.handleTimerTick=a.handleTimerTick.bind(Object(h.a)(a)),a}return Object(m.a)(n,[{key:"getNextQuestionState",value:function(){var e=this.props.nextQuestion();if(e.done)return null;var t=e.value,n=this.createChoices(t.incorrectAnswers,t.correctAnswer);return{questionObject:t,timeRemaining:10,currTimer:setInterval(this.handleTimerTick,16.67),choiceList:n.choiceList,correctIndex:n.correctIndex,choiceIDs:n.IDs,answered:!1}}},{key:"createChoices",value:function(e,t){var n=Math.floor(Math.random()*(e.length+1)),a=e.slice();a.splice(n,0,t);for(var r=[],i=0;i<a.length;i++)r[i]=g()();return{choiceList:a,correctIndex:n,IDs:r}}},{key:"delayedQuestionUpdate",value:function(){var e=this;setTimeout((function(){var t=e.getNextQuestionState();if(t)e.setState(t);else{var n=e.state.runningResults.reduce((function(e,t){return t?e+1:e}),0);e.props.endGame(n)}}),2e3)}},{key:"handleQuestionAnswered",value:function(e){this.state.answered||(clearInterval(this.state.currTimer),this.setState({currTimer:null,answered:!0,runningResults:this.state.runningResults.concat([e])}),this.delayedQuestionUpdate())}},{key:"handleTimerTick",value:function(){if(!this.state.answered){var e=this.state.timeRemaining-.01617,t=this.state.currTimer,n=!1,a=this.state.runningResults;e<=0&&(clearInterval(this.state.currTimer),t=null,n=!0,a=this.state.runningResults.concat([!1]),this.delayedQuestionUpdate()),this.setState({timeRemaining:e,currTimer:t,answered:n,runningResults:a})}}},{key:"componentWillMount",value:function(){this.setState(this.getNextQuestionState())}},{key:"render",value:function(){var e=window.innerWidth<=700,t={hasTimer:e};return e&&(t.allotedTime=10,t.timeRemaining=this.state.timeRemaining),r.a.createElement("main",{className:"GamePane"},r.a.createElement("div",{className:"GamePane__QA"},r.a.createElement(E,Object.assign({questionNumber:this.state.questionObject.number,questionPrompt:this.state.questionObject.prompt},t)),r.a.createElement(k,{choiceList:this.state.choiceList,choiceIDs:this.state.choiceIDs,correctIndex:this.state.correctIndex,onAnswer:this.handleQuestionAnswered,answered:this.state.answered}),!e&&r.a.createElement(C,{allotedTime:10,timeRemaining:this.state.timeRemaining})),r.a.createElement(T,{currNumber:this.state.questionObject.number,runningResults:this.state.runningResults,questionCount:this.props.questionCount,currWasAnswered:this.state.answered}))}},{key:"componentWillUnmount",value:function(){this.state.currTimer&&clearInterval(this.state.currTimer)}}]),n}(r.a.Component),y=(n(25),function(e){return r.a.createElement("footer",{className:"Footer"},r.a.createElement("a",{href:"https://ionicons.com"},r.a.createElement("ion-icon",{name:"logo-ionic"}),r.a.createElement("p",null,"Icons by Ionic")),r.a.createElement("a",{href:"https://github.com/Deanfost/react-trivia"},r.a.createElement("ion-icon",{name:"logo-github"}),r.a.createElement("p",null,"View on Github")),r.a.createElement("a",{href:"https://opentdb.com"},r.a.createElement("ion-icon",{name:"server"}),r.a.createElement("p",null,"Trivia by OpenTDB")))}),R=(n(26),function(e){return r.a.createElement("div",{className:"Loader"},r.a.createElement("div",{className:"Loader__Spinner"},r.a.createElement("div",{className:"Loader__Circle"}),r.a.createElement("div",{className:"Loader__Row"},r.a.createElement("div",{className:"Loader__Circle"}),r.a.createElement("div",{className:"Loader__Circle"})),r.a.createElement("div",{className:"Loader__Circle"})),r.a.createElement("p",{className:"Loader__Message"},"Loading a new game..."))}),S=(n(27),function(e){return e.shouldDisplayTitle?r.a.createElement("div",{className:"GameFinished"},r.a.createElement("h1",{className:"GameFinished__Score"},"Trivia!"),r.a.createElement("p",{className:"GameFinished__Caption"},"General knowledge"),r.a.createElement("div",{className:"GameFinished__Button",onClick:e.onClick},"Start game")):r.a.createElement("div",{className:"GameFinished"},r.a.createElement("p",{className:"GameFinished__Caption"},"Game finished!"),r.a.createElement("h1",{className:"GameFinished__Score"},"Your score: ",e.score,"/",e.totalQuestions),r.a.createElement("div",{className:"GameFinished__Button",onClick:e.onClick},"Play again"))}),I=(n(28),function(e){return r.a.createElement("div",{className:"Problem"},r.a.createElement("p",{className:"Problem__Oops"},"Something went wrong!"),r.a.createElement("p",{className:"Problem__Issue"},e.issue.message),r.a.createElement("div",{className:"Problem__Button",onClick:e.onClick},"Try again"))}),x="https://opentdb.com/api.php?amount=".concat(10,"&category=9&difficulty=easy"),A=function(e){Object(d.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={dataIsPending:!1,error:null,showingTitleScreen:!0},a.handleNavClick=a.handleNavClick.bind(Object(h.a)(a)),a.fetchQuestions=a.fetchQuestions.bind(Object(h.a)(a)),a.nextQuestion=a.nextQuestion.bind(Object(h.a)(a)),a.handleEndOfGame=a.handleEndOfGame.bind(Object(h.a)(a)),a}return Object(m.a)(n,[{key:"fetchQuestions",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({dataIsPending:!0,error:null,showingTitleScreen:!1}),e.prev=1,e.next=4,fetch(x);case 4:if((t=e.sent).ok){e.next=7;break}throw new Error("Fetch operation failed, received error code: (".concat(t.status,") ").concat(t.statusText));case 7:return e.next=9,t.json();case 9:if(0===(n=e.sent).response_code){e.next=12;break}throw new Error("API returned error code: ".concat(n.response_code));case 12:this.setState({dataIsPending:!1,questionGenerator:this.questionGenerator(n.results),finalScore:null}),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(1),this.setState({dataIsPending:!1,error:e.t0});case 18:case"end":return e.stop()}}),e,this,[[1,15]])})));return function(){return e.apply(this,arguments)}}()},{key:"questionGenerator",value:o.a.mark((function e(t){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=o.a.mark((function e(n){var a,r,i,s,c,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t[n],r=new DOMParser,i=r.parseFromString(a.question,"text/html").documentElement.textContent,s=r.parseFromString(a.correct_answer,"text/html").documentElement.textContent,c=a.incorrect_answers.map((function(e){return r.parseFromString(e,"text/html").documentElement.textContent})),l={number:n+1,prompt:i,correctAnswer:s,incorrectAnswers:c},e.next=8,l;case 8:case"end":return e.stop()}}),e)})),a=0;case 2:if(!(a<t.length)){e.next=7;break}return e.delegateYield(n(a),"t0",4);case 4:a++,e.next=2;break;case 7:case 8:case"end":return e.stop()}}),e)}))},{key:"nextQuestion",value:function(){return this.state.questionGenerator.next()}},{key:"handleNavClick",value:function(){this.setState({showingTitleScreen:!0})}},{key:"handleEndOfGame",value:function(e){this.setState({finalScore:e})}},{key:"render",value:function(){var e,t="App",n=!this.state.dataIsPending&&!this.state.error&&null===this.state.finalScore&&!this.state.showingTitleScreen;return this.state.showingTitleScreen?(e=r.a.createElement(S,{shouldDisplayTitle:!0,onClick:this.fetchQuestions}),t+=" App--Centered"):this.state.dataIsPending?(e=r.a.createElement(R,null),t+=" App--Centered"):n?e=r.a.createElement(j,{nextQuestion:this.nextQuestion,questionCount:10,endGame:this.handleEndOfGame}):this.state.dataIsPending||this.state.error||null===this.state.finalScore?(e=r.a.createElement(I,{issue:this.state.error,onClick:this.fetchQuestions}),t+=" App--Centered"):(e=r.a.createElement(S,{shouldDisplayTitle:!1,score:this.state.finalScore,totalQuestions:10,onClick:this.fetchQuestions}),t+=" App--Centered"),r.a.createElement("div",{className:t},n&&r.a.createElement(f,{onClick:this.handleNavClick}),e,r.a.createElement(y,null))}}],[{key:"getDerivedStateFromError",value:function(e){this.setState({error:e})}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[11,1,2]]]);
//# sourceMappingURL=main.957eb00b.chunk.js.map