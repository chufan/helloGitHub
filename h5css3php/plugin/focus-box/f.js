function FocusFade(opts){
	this.opt = {};
	this.opt.root = null;
	this.opt.child = [];
	this.runHandler = [];	/* ���� */
	this.active = 0;
	this.isExec = false;
	this.opt.IntervalForPlay = 5000;
	this.length = this.opt.child.length;
	this.opt.page = {
		cur : 1,	/*��ǰҳ*/
		pre : this.opt.child.length	/*��ҳ��*/
	};
	this.opt.nextCallBefore = function(){};
	this.opt.preCallBefore = function(){};
	this.opt.goToCallBefore = function(){};
	this.play_handle_cache = [];
	this.play_state = false;
	this.init(opts);
	this.s = window.navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/);
	this.isIE = (this.s != null && typeof this.s[0] == 'string' && (this.s[0]=='msie 6.0' || this.s[0]=='msie 7.0' || this.s[0]=='msie 8.0'));
	// this.isIE = /*@cc_on!@*/false;
}

FocusFade.prototype = {
	constructor : FocusFade,
	setOptions	: function(options){
		var _this = this;
		(function(){for(var i in options){
			_this.opt[i] = options[i];
		}})();
	},
	play : function(){	//����
		var _this = this;
		if(!this.play_state){
			this.play_state = true;
			this.play_handle_cache.push(setInterval(function(){
				_this.next();
			},_this.opt.IntervalForPlay));
		}
	},
	stop : function(){	//ֹͣ
		for(var i=0,len=this.play_handle_cache.length;i<len;i++){
			clearInterval(this.play_handle_cache[i]);
		}
		this.play_handle_cache.length = 0;
		this.play_state = false;
	},
	prev : function(){	//ǰҳ
		if(this.getPage().cur - 1 <= 0){
			this.exec(this.getPage().pre);
		}else{
			this.exec(this.getPage().cur - 1);
		}
		this.runCallback(this.opt.preCallBefore);
	},
	pre : function(){
		this.prev();
	},
	next : function(){	//��ҳ
		if(this.getPage().cur >= this.getPage().pre){
			this.exec(1);
		}else{
			this.exec(this.getPage().cur + 1);
		}
		this.runCallback(this.opt.nextCallBefore);
	},
	goTo : function(n){
		this.exec(n);
		this.runCallback(this.opt.goToCallBefore);
	},
	init : function(opts){
		var _this = this;
		this.setOptions(opts);
		this.opt.root = this.$(this.opt.root);
		for(var i=0,len=this.opt.root.children.length;i<len;i++){
			this.opt.child.push({
				node : this.opt.root.children.item(i),
				index : i,
				/*
				*	1 ��ʾ		*
				*	2 ����		*
				*	3 ��ʾ��		*
				*	4 ������		*
				*/
				state : i==0?1 : 2,	/* �ڢٸ�λ��ʾ״̬ */
				nv : i==0?10 : 0	/* �ڢٸ�λ͸����Ϊ10��������Ϊ0 */
			});
		}
		this.length = this.opt.root.children.length;
		this.setPage(1,this.length);
	},
	execStop : function(){
		/* �Ѿ�û��ִ�б�Ҫ���������ʱ�� */
		for(var j =0,len=this.runHandler.length;j<len;j++){
			clearInterval(this.runHandler[j]);
		}
		this.runHandler.length = 0;
		this.isExec = false;
	},
	exec : function(n,callback){
		this.setPage(n);
		this.opt.child[this.active].node.style.zIndex = 1;
		this.opt.child[n-1].node.style.zIndex = 2;
		if(n-1 == this.active)return;
		var _this = this;
		this.change(n);
		if(!this.isExec){
			this.isExec = true;
			this.runHandler.push(setInterval(function(){
				if( !_this.isStop() ){
					_this.execStop();
				}else{
					_this.f1();
				}
			},25));
		}
	},
	change : function(n){
		/* ֻ��һ������ʾ�ģ�������ʼִ�����ض��� */
		this.opt.child[this.active].state = 4;
		/* ���������� */
		this.active = n - 1;
		/* ֻ��һ������ʾ���õ�ǰ�������ʼ��ʾ */
		this.opt.child[this.active].state = 3;
	},
	f1 : function(){
		for(var i=0,len=this.length;i<len;i++){
			/* �˴�ֻ������ʾ�л��������е�Ԫ�� */
			switch (this.opt.child[i].state){
				case 3 :
					if(this.opt.child[i].nv < 10){	/* ���û�дﵽ��ֵ */
						this.opt.child[i].nv++;
						this.fade(this.opt.child[i].node,this.opt.child[i].nv);
					}else{
						/* ����ﵽ��ֵ,�ı���״̬�� */
						this.opt.child[i].nv = 10;
						this.opt.child[i].state = 1;
					}
				break;
				case 4 :
					if(this.opt.child[i].nv > 0){	/* ���û�дﵽ��ֵ */
						this.opt.child[i].nv--;
						this.fade(this.opt.child[i].node,this.opt.child[i].nv);
					}else{
						/* ����ﵽ��ֵ,�ı���״̬�� */
						this.opt.child[i].nv = 0;
						this.opt.child[i].state = 2;
					}
				break;
			}
		}
	},
	isStop : function(){
		for(var i=0,len=this.length;i<len;i++){
			if( this.opt.child[i].state == 3 || this.opt.child[i].state == 4 ){
				return true;
			}
		}
		return false;
	},
	fade : function(element,i){
		if(this.isIE){	/* IE�� */
			this.fade = function(element,i){
				element.style.filter = "alpha(opacity=" + ( i * 10 ) + ")";
			}
		}else{/* ��IE�µ� */
			this.fade = function(element,i){
				if(i>=10)element.style.opacity = "0.99";
				else if(i<=0)element.style.opacity = "0";
				else element.style.opacity = "0." + i + "9";
			}
		}
		this.fade(element,i);
	},
	setDisplay : function(element,isdisplay){	//���ÿɼ���
		element.style.display = isdisplay?'block':'none';
	},
	testie : function(){
		alert(this.opt.page.pre);
	},
	getPlayState : function(){
		return this.play_state;
	},
	getPage : function(){
		return this.opt.page;
	},
	$ : function(id){	/* ��ID */
		return document.getElementById(id);
	},
	setPage : function(cur,pre){
		if(typeof cur != 'undefined')this.opt.page.cur = cur;
		if(typeof pre != 'undefined')this.opt.page.pre = pre;
	},
	runCallback : function(callback){
		if(typeof callback == "function"){
			callback(this.getPage().cur);
		}
		var _this = this;
		if(typeof _this.public_callback == 'function'){
			_this.public_callback(this.getPage().cur);
		}
	}
}