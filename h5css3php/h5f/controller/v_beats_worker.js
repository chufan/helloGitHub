// onmessage =function (evt){
// 	var d = evt.data;			// get main thread data
// 	postMessage( d );			// post data to main thread
// }

// Worker �self �� this ָ�Ķ��� Worker ��ȫ��������

importScripts('/h5f/controller/v_worker.util.js');
var n=0, w_timer=null,url='/h5f/business/beats.php?n=';
self.addEventListener('message', function(e) {
	var data = e.data;
	switch (data.cmd) {
    case 'start':
		self.postMessage('WORKER STARTED: ' + data.msg);

		w_timer = setInterval(function(){
			vve.ajxget(url+n, 1000, function successf(d){
				n = parseInt(d);
				self.postMessage('beats:'+ d);
			}, function errorf(d){
				self.postMessage('beats[error]:'+ d);
			});
		}, 2000);

		break;
    case 'stop':
		self.postMessage('WORKER STOPPED: ' + data.msg);
		if(w_timer!==null) {clearInterval(w_timer);w_timer=null; }

		self.close(); // Terminates the worker.
		break;
	case 'load':
		// importScripts('a.js','b.js'); full path ��Ҫȫ·����
		importScripts(data.msg);
		// ���� worker ��������
		break;
    default:
		self.postMessage('Unknown command: ' + data.msg);
	};
}, false);
