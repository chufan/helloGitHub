(function VVEngine(env){
	var z = {};					
	if(env.vve===undefined) { env.vve = z; }else{ z = env.vve; } // ������
	if(z.loaded!==undefined) { return; }						 // ��ֹ�ظ�����!
	z.loaded=true;
	
	z.extend=function(o){
		var k,target=this;
		// alert(this===z);
		for(k in o) {
			target[k]=o[k];
		}
	};

	z.clog = function(){		// ����Ԥ���أ���ֹ�ظ��ж�
		if(typeof console === 'object'){
			return function(msg){ console.log(msg); };
		}else if(typeof opera === 'object'){
			return function(msg){ opera.postError(msg);};
		}else if(typeof java ==='object' && typeof java.lang === 'object'){
			return function(msg){ java.lang.System.out.println(msg);};
		}
	}();						// �������ʽ������������ִ�в���ֵ

	z.itype = function (obj,type) {
		return (type === "Null" && obj === null) ||
			(type === "Undefined" && obj === void 0 ) ||
			(type === "Number" && isFinite(obj)) ||
			Object.prototype.toString.call(obj).slice(8,-1) === type;
	}

	z.extend({
		createXHR: function() {
			if(typeof XMLHttpRequest !== 'undefined') {
				createXHR = function(){ // �ӳټ��أ���д���к�������ֹ�ظ��ж�
					return new XMLHttpRequest();
				}
			}else if(typeof ActiveXObject !== 'undefined') {
				if(typeof arguments.callee.activeXv !== 'string') {
					var versions=['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'],i,len,xhr=null;
					for(i=0,len=versions.length;i<len;++i) {
						try{
							xhr=new ActiveXObject(versions[i]);
							arguments.callee.activeXv=versions[i];
							delete xhr; xhr=null;
							break;
						}catch(ex){}
					}
				}
				createXHR = function(){
					return new ActiveXObject(arguments.callee.activeXv);
				}
			}else{
				throw new Error('No XHR object available.');
			}
			return createXHR();
		},

		// 
		ajxpost: function(url,data,timeout,okf,errf) {
			var xhr = z.createXHR(), tot=null;

			xhr.onreadystatechange=function() {
				z.clog('post readyState:'+xhr.readyState+' status:'+xhr.status);
				if(xhr.readyState===4 && xhr.status===200) {
					if(tot!==null) {
						clearTimeout(tot); tot=null;
					}
					// z.clog('responseHeader:'+xhr.getResponseHeader('Date')+'<br>'+xhr.getAllResponseHeaders());
					okf(xhr.responseText);
					xhr=null;	// �ͷ��ڴ�
				}
			}

			xhr.open('POST', url, true);
			// z.clog('post open');
			xhr.setRequestHeader('myfav','xyqt');
			xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded'); // ���룿

			tot = setTimeout(function() {
				xhr.abort();
				// delete xhr;
				xhr=null;
				errf('ajax ��ʱ');
			}, timeout);
			xhr.send(data);
			// z.clog('post send');
		},

		ajxget: function(url, timeout, okf, errf) {
			var xhr = z.createXHR(), tot=null;

			xhr.onreadystatechange=function() {
				z.clog('get readyState:'+xhr.readyState+' status:'+xhr.status);
				if(xhr.readyState===4 && xhr.status===200) {
					if(tot!==null) {
						clearTimeout(tot); tot=null;
					}
					// z.clog('responseHeader:'+xhr.getResponseHeader('Date')+'<br>'+xhr.getAllResponseHeaders());
					okf(xhr.responseText);
					xhr=null;	// �ͷ��ڴ�
				}
			}

			xhr.open('GET', url, true);
			// z.clog('get open');
			xhr.setRequestHeader('myfav','xfzg');

			tot = setTimeout(function() {
				xhr.abort();
				// delete xhr;
				xhr=null;
				errf('ajax ��ʱ��');
			}, timeout);
			xhr.send(null);
			// z.clog('get send');
		},

	});
})(self);
