/**
����ͼ����
*/

var focus_view1_run = (function (){
	var focus_view_txt = getId('focus_view_txt').children;
	var focus_view1_btns   = document.getElementById('focus_view1_btn').getElementsByTagName('a');
	return function(ga){
		(function(){for(var i=0,len=focus_view1_btns.length;i<len;i++){
			focus_view1_btns[i].className = '';
			focus_view_txt.item(i).className = '';
		}})();
		focus_view_txt.item(ga).className = 'current';
		focus_view1_btns[ga].className = 'current';
	}
})();

var focus_view1 = new FocusFade({
	root : 'focus_view1_ul',
	IntervalForPlay : 4000,
	// easing : 'easeInQuart',
	// anTime : 500,
	preCallBefore : function(p,c){
		focus_view1_run(p-1);
	},
	nextCallBefore : function(p,c){
		focus_view1_run(p-1);
	}
});

focus_view1.play();

var focus_view1_box = document.getElementById('focus_view1');
var fv1_leftbtn = document.getElementById('focus_view1_leftbtn');
var fv1_rightbtn = document.getElementById('focus_view1_rightbtn');
var focus_view1_play_state = (document.getElementById('focus_view1_ul').getElementsByTagName('li').length>1);
addHandler(focus_view1_box,'mouseover',function(){ //��꾭���¼�
	if(focus_view1_play_state)focus_view1.stop();
	fv1_leftbtn.style.display='block';
	fv1_rightbtn.style.display='block';
});

addHandler(focus_view1_box,'mouseout',function(){ //����뿪�¼�
	if(focus_view1_play_state)focus_view1.play();
	fv1_leftbtn.style.display='none';
	fv1_rightbtn.style.display='none';
});

//��߰�ť����ʾ�¼�
addHandler(fv1_leftbtn,'mouseover',function(){ //��꾭���¼�
	if(focus_view1_play_state)focus_view1.stop();
	fv1_leftbtn.style.display='block';
	fv1_rightbtn.style.display='block';
});

addHandler(fv1_leftbtn,'mouseout',function(){ //����뿪�¼�
	if(!focus_view1_play_state)focus_view1.play();
	fv1_leftbtn.style.display='none';
	fv1_rightbtn.style.display='none';
});

//�ұ߰�ť����ʾ�¼�
addHandler(fv1_rightbtn,'mouseover',function(){ //��꾭���¼�
	if(focus_view1_play_state)focus_view1.stop();
	fv1_leftbtn.style.display='block';
	fv1_rightbtn.style.display='block';
});

addHandler(fv1_rightbtn,'mouseout',function(){ //����뿪�¼�
	if(!focus_view1_play_state)focus_view1.play();
	fv1_leftbtn.style.display='none';
	fv1_rightbtn.style.display='none';
});

//׼��ʹ�ú���
function setMouseOverOutbtnDisplay(config){
	obj = config.obj;
	eventtype = config.eventtype;
	obj = config.objdh;
	obj = config.obj;
	//obj��꾭���Ķ���
	//eventtype �¼�����
	// objdh ����״̬
	//playstate����״̬
	//clickobjL ��ť������ʾ����
	//clickobjR ��ť������ʾ����
	//dis block||none

	addHandler(obj,eventtype,function(){ //����뿪�¼�
		if(playstate)objdh.play();
		clickobjL.style.display=dis;
		clickobjR.style.display=dis;
	});
}

addHandler(fv1_leftbtn,'click',function(){ //ǰһ��
	if(focus_view1_play_state)focus_view1.stop();
	focus_view1.pre();
});

addHandler(fv1_rightbtn,'click',function(){ //��һ��
	if(focus_view1_play_state)focus_view1.stop();
	focus_view1.next();
});

//if(focus_view1_play_state)focus_view1.play();
(function(focus_view1_btns){
	for(var i=0,len=focus_view1_btns.length;i<len;i++){
		focus_view1_btns[i].onclick = (function(i){
			return function (event){
				// if(splendidActive.goTo(i+1)){

					focus_view1.goTo(i+1);
					focus_view1_run(i);
				// }
			}
		})(i);
	}
})(document.getElementById('focus_view1_btn').getElementsByTagName('a'));
