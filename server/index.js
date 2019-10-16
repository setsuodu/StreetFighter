var ws = require("nodejs-websocket");
var schedule = require('node-schedule');
var mysql = require('mysql');
var port = 3001;
//var onlineUsers = []; //server.connections代替
var waits = []; //等待匹配的玩家
//var gamers = []; //竞技中的玩家

//https://www.runoob.com/nodejs/nodejs-mysql.html
var connection;
function handleError() {
	connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'test'
	});
    //连接错误，2秒重试
	connection.connect(function(err) {
		if (err) {
			console.log('error when connecting to db:', err);
			setTimeout(handleError, 2000);
		}
	});
	connection.on('error', function(err) {
		console.log("[mysql error]", err);
		// 如果是连接断开，自动重新连接
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleError();
		} else {
			throw err;
		}
	});
}
handleError();

/*
// (node:10908) [DEP0096] DeprecationWarning: timers.unenroll() is deprecated. Please use clearTimeout instead. 
// nodejs 在运行时，报如上的警告，程序不影响执行，但是不清楚为什么有如些警告
*/

// 用户状态，由服务器控制
var PlayerStatus = {};			//状态枚举	
PlayerStatus.DISCONNECT = -1; 	//离线
PlayerStatus.FREE = 0;			//空闲状态
PlayerStatus.WAIT = 1;			//等待匹配
PlayerStatus.GAME = 2;			//游戏中

// 创建一个连接
var server = ws.createServer(function(conn) {
	console.log('---------------------创建一个新的连接-----------------------');
    var msg = {}; //仅对当前连接返回
	//console.log("users: ", server.connections);
	//用户进入消息
    //msg.type = "sc_enter";
    //msg.data = "进来啦"
	//var jsonStr = JSON.stringify(msg);
    //broadcast(jsonStr);
	console.log("onlineCount: " + server.connections.length);
	console.log('------------------------------------------------------------\n\n');

    //向客户端推送消息
    conn.on("text", function(json) {
        //console.log("服务器收到：" + json);
		//{\"type\":\"message\", \"data\":\"hello\"}
		// 不规范字符处理
		var obj = null;
        try {
            obj = JSON.parse(json);
        } catch (err) {
            console.log("解析错误：", err);
        }
		if(obj == null) {
			console.log("无法解析的类型");
			return;
		}
		
		switch(obj.type) {
			case "message": { //聊天消息
				msg.type = "message";
				msg.data = conn.nickname + " 说:    " + obj.data;
				broadcast(JSON.stringify(msg));
				break;
			}
			case "beep": { //心跳
				msg.type = "boop";
				var jsonStr = JSON.stringify(response);
				conn.sendText(jsonStr);
				break;
			}
			case "cs_register": { //注册
				console.log("[请求注册]用户名：" + obj.nick + "，密码：" + obj.pwd);
				var response = {};
				var sql = "SELECT count(*) AS count FROM db_user where nickname= '" + obj.nick + "'";
				console.log(sql);
				connection.query(sql, (err, rows, fields)=> {
					if(err) {
						console.log('[SELECT ERROR] - ', err.message);
						throw err;
					}
					console.log('--------------------------SELECT----------------------------');
					console.log('SELECT ID:', rows[0].count);
					console.log('------------------------------------------------------------\n\n');
					//1.昵称被占用
					if(rows[0].count > 0) {
						response = {
							"type": "sc_register_failed",
						};
						var json = JSON.stringify(response);
						console.log(json);
						conn.sendText(json);
					} else { //2.注册成功
						var curtime = (new Date()).toLocaleString();
						var sql = 'INSERT INTO db_user (nickname,pwd,createtime) VALUES(?,?,?)';
						var params = [obj.nick,obj.pwd,curtime];
						connection.query(sql, params, (err, rows)=> {
							if(err) {
								console.log('[INSER ERROR] - ', err.message);
								throw err;
							}
							console.log('--------------------------INSERT----------------------------');
							//console.log('INSERT ID:', rows);
							var sql = 'SELECT * FROM db_user where nickname=?';
							var params = [obj.nick];
							connection.query(sql, params, (err, rows)=> {
								if(err) {
									console.log('[INSER ERROR] - ', err.message);
									throw err;
									//connection.end();
								}
								console.log('--------------------------SELECT----------------------------');
								//console.log('SELECT ID:', rows);
								response = {
									"type": "sc_login_success",
									"uid": rows[0].uid,
									"nickname": rows[0].nickname,
									"pwd": rows[0].pwd,
								};
								var json = JSON.stringify(response);
								console.log(json);
								conn.sendText(json);
								console.log('------------------------------------------------------------\n\n');
								conn.uid = rows[0].uid;
								conn.nickname = rows[0].nickname;
								conn.state = (PlayerStatus.FREE);
								console.log("[用户状态变更]" + conn.nickname + "=>" + conn.state);
							});
							console.log('------------------------------------------------------------\n\n');
						});
					}
				});
				break;
			}
			case "cs_login": { //昵称登录
				console.log("[请求登录]账号：" + obj.nickname + "，密码：" + obj.pwd);
				var sql = "SELECT * FROM db_user where nickname=? AND pwd=?";
				var params = [obj.nickname, obj.pwd];
				connection.query(sql, params, (err, rows)=> {
					if(err) {
						console.log('[SELECT ERROR] - ', err.message);
						throw err;
					}
					console.log('--------------------------SELECT----------------------------');
					//console.log('SELECT ID:', rows);
					//1.返回登录失败
					if(rows.length == 0) {
						var response = {
							"type": "sc_login_failed"
						};
						var jsonStr = JSON.stringify(response);
						console.log(jsonStr);
						conn.sendText(jsonStr);
						return;
					}
					//2.返回登录成功
					var response = {
						"type": "sc_login_success",
						"uid": rows[0].uid,
						"pwd": rows[0].pwd,
						"nickname": rows[0].nickname,
					}
					var jsonStr = JSON.stringify(response);
					console.log(jsonStr);
					conn.sendText(jsonStr);
					console.log('------------------------------------------------------------\n\n');
					conn.uid = rows[0].uid;
					conn.nickname = rows[0].nickname;
					conn.state = (PlayerStatus.FREE);
					console.log("[用户状态变更]" + conn.nickname + "=>" + conn.state);
				});
				break;
			}
			case "cs_autoLogin": { //cookie自动登录
				console.log("[请求登录]账号：" + obj.uid + "，密码：" + obj.pwd);
				var sql = "SELECT * FROM db_user where uid=? AND pwd=?";
				var params = [obj.uid, obj.pwd];
				connection.query(sql, params, (err, rows)=> {
					if(err) {
						console.log('[SELECT ERROR] - ', err.message);
						throw err;
					}
					console.log('--------------------------SELECT----------------------------');
					//console.log('SELECT ID:', rows);
					//1.返回登录失败
					if(rows.length == 0) {
						var response = {
							"type": "sc_login_failed"
						};
						var json = JSON.stringify(response);
						console.log(json);
						conn.sendText(json);
						return;
					}
					//2.返回登录成功
					var response = {
						"type": "sc_login_success",
						"uid": rows[0].uid,
						"pwd": rows[0].pwd,
						"nickname": rows[0].nickname,
					}
					var json = JSON.stringify(response);
					console.log(json);
					conn.sendText(json);
					console.log('------------------------------------------------------------\n\n');
					conn.uid = rows[0].uid;
					conn.nickname = rows[0].nickname;
					conn.state = (PlayerStatus.FREE);
					console.log("[用户状态变更]" + conn.nickname + "=>" + conn.state);
				});
				break;
			}
			case "cs_sign": { //签到
				var curdate = (new Date()).toLocaleDateString();
				console.log("今天是：" + curdate);
				var sql = "SELECT count(*) AS count FROM db_sign where uid=? AND date=?";
				var params = [obj.uid, curdate];
				connection.query(sql, params, (err, rows, fields)=> {
					if(err) {
						console.log('[SELECT ERROR] - ', err.message);
						throw err;
					}
					console.log('--------------------------SELECT----------------------------');
					console.log('今日已签到:', rows[0].count);
					if(rows[0].count > 0) {
						//今日已签到
						var response = {
							"type": "sc_sign_failed",
							"code": 1
						}
						conn.sendText(JSON.stringify(response));
					} else {
						//写入签到记录到SQL
						var sql = "INSERT INTO db_sign (uid,date) VALUES (?,?)";
						var params = [obj.uid, curdate];
						connection.query(sql, params, (err, rows, fields)=> {
							if(err) {
								//写入失败
								var response = {
									"type": "sc_sign_failed",
									"code": 2
								}
								conn.sendText(JSON.stringify(response));
								console.log('[INSERT ERROR] - ', err.message);
								throw err;
							}
							console.log('--------------------------INSERT----------------------------');
							console.log('INSERT ID:', rows);
							var response = {
								"type": "sc_sign_success",
								"item": "gold",
								"amount": "100",
							}
							conn.sendText(JSON.stringify(response));
							console.log('------------------------------------------------------------\n\n');
						});
					}
					console.log('------------------------------------------------------------\n\n');
				});
				break;
			}
			case "cs_match": { //匹配
				joinInMatch(conn);
				break;
			}
			case "cs_cancel_match": { //取消匹配
				cancelMatch(conn);
				break;
			}
			/* 
			 * 游戏逻辑
			 */
			case "cs_gameReady": {
				console.log("用户准备好了：" + conn.nickname + "(" + conn.side + ")" 
							+ " vs " + conn.enemy.nickname + "(" + conn.enemy.side + ")");
				if(conn.side == 0) {
					var response = {
						"type": "sc_ready",
						"uid": conn.uid,
						"user0": {"uid": conn.uid, "nickname": conn.nickname},
						"user1": {"uid": conn.enemy.uid, "nickname": conn.enemy.nickname},
					}
				} else {
					var response = {
						"type": "sc_ready",
						"uid": conn.uid,
						"user0": {"uid": conn.enemy.uid, "nickname": conn.enemy.nickname},
						"user1": {"uid": conn.uid, "nickname": conn.nickname},
					}
				}
				var jsonStr = JSON.stringify(response);
				console.log(jsonStr);
				conn.sendText(jsonStr);
				//conn.enemy.sendText(JSON.stringify(response));
				break;
			}
			case "cs_fist": { //出拳
				console.log(conn.uid + "[请求出拳]");
				var response = {
					"type": "sc_fist",
					"uid": conn.uid,
				}
				conn.sendText(JSON.stringify(response));
				conn.enemy.sendText(JSON.stringify(response));
				break;
			}
			case "cs_kick": { //踢脚
				console.log(conn.uid + "[请求踢脚]");
				var response = {
					"type": "sc_kick",
					"uid": conn.uid,
				}
				conn.sendText(JSON.stringify(response));
				conn.enemy.sendText(JSON.stringify(response));
				break;
			}
			case "cs_jump": { //跳跃
				console.log(conn.uid + "[请求跳跃]");
				var response = {
					"type": "sc_jump",
					"uid": conn.uid,
				}
				conn.sendText(JSON.stringify(response));
				conn.enemy.sendText(JSON.stringify(response));
				break;
			}
			case "cs_defend": { //防守
				console.log(conn.uid + ((obj.defend == 0)? "[取消防守]":"[请求防守]"));
				var response = {
					"type": "sc_defend",
					"uid": conn.uid,
					"defend": obj.defend
				}
				conn.sendText(JSON.stringify(response));
				conn.enemy.sendText(JSON.stringify(response));
				break;
			}
			case "cs_move": { //移动
				var response = {
					"type": "sc_move",
					"uid": conn.uid,
					"posz": obj.posz,
				}
				var jsonStr = JSON.stringify(response);
				console.log("[请求移动]", jsonStr);
				conn.sendText(jsonStr);
				conn.enemy.sendText(jsonStr);
				break;
			}
			case "cs_hit": { //伤害
				//命中距离、防御都在客户端判定了，这里只做转发
				var response = {
					"type": "sc_hit",
					"uid": conn.enemy.uid, //受伤方
					"damage": obj.amount,
					"broken": obj.broken,
				}
				var jsonStr = JSON.stringify(response);
				console.log(conn.enemy.nickname + "挨打了" + obj.amount);
				conn.sendText(jsonStr);
				conn.enemy.sendText(jsonStr);
				break;
			}
			case "cs_dead": { //死亡
				console.log(conn.uid + "[报告死亡]");
				var response = {
					"type": "sc_dead",
					"win": conn.enemy.uid,
					"lose": conn.uid,
					"gold": 100,
				}
				conn.sendText(JSON.stringify(response));
				conn.enemy.sendText(JSON.stringify(response));
				break;
			}
			case "cs_standup": { //站起
				console.log(conn.uid + "[请求站起]");
				var response = {
					"type": "sc_standup",
					"uid": conn.uid,
					"status": (PlayerStatus.FREE),
				}
				conn.sendText(JSON.stringify(response));
				conn.enemy.sendText(JSON.stringify(response));
				break;
			}
		}
    });

    //监听关闭连接操作
    conn.on("close", function(code, reason) {
		console.log('------------------------关闭一个连接------------------------');
        msg.type = "leave";
        msg.data = conn.nickname + "离开了"
		var json = JSON.stringify(msg);
        broadcast(json);
		//conn = null;
		waits.forEach(function(connection){
			if(connection.uid == conn.uid) {
				waits.splice(conn); //数组中删除该玩家
			}
		});
		console.log("onlineCount: " + server.connections.length + "\nwaitCount: " + waits.length);
		console.log('------------------------------------------------------------\n\n');
    });

    //错误处理
    conn.on("error", function(err) {
        console.log("监听到错误：" + err);
		//Error: read ECONNRESET
		//具体原因client强制退出的时候，server仍认为是链接的.onread中读取到错误信息 
		//当socket已经断开连接的时候，还继续往这个socket里面写数据就会出错
    });
}).listen(port);

console.log('--- server is running ...');

function broadcast(str) {
	console.log("广播给：" + server.connections.length + "人");
    server.connections.forEach(function(connection){
        connection.sendText(str);
    });
}

var matchJob = null; //匹配定时任务
function joinInMatch(player) { // 加入匹配
	waits.push(player);
	player.state = (PlayerStatus.WAIT);
	var curtime = (new Date()).toLocaleString();
	player.time = curtime;
	console.log(player.nickname + "[加入匹配]");
	
	//等待中的玩家按时间排序
	waits = arraySortByTime(waits);
	//console.log("排序后：", waits);
	
	//每2秒执行一次，循环?次。。
	var times = 0;
	var rule = new schedule.RecurrenceRule();
	var secs = [];
	for(var i = 0; i < 60; i+=2) {
		secs.push(i);
	}
	rule.second = secs;
	if(matchJob == null) {
		matchJob = schedule.scheduleJob(rule, ()=> 
		{
			console.log("等待匹配人数：" + waits.length);
			
			if(waits.length >= 2) {
				var p0 = waits[0];
				waits[0].side = 0; //左边
				waits[0].state = (PlayerStatus.GAME); //进入游戏状态
				var p1 = waits[1];
				waits[1].side = 1; //右边
				waits[1].state = (PlayerStatus.GAME);
				waits[0].enemy = waits[1];
				waits[1].enemy = waits[0];
				waits = waits.slice(p0,p1);
				//1.匹配成功
				var response = {
					"type": "sc_match_success",
					"usr1": {"uid": p0.uid, "nickname": p0.nickname},
					"usr2": {"uid": p1.uid, "nickname": p1.nickname},
				}
				p0.sendText(JSON.stringify(response));
				p1.sendText(JSON.stringify(response));
			}
			
			if(waits.length <= 0) { //没人在匹配了，停止工作
				matchJob.cancel();
				matchJob = null;
				console.log("当前没有玩家，关闭定时器");
			}
		});
	}
}
function cancelMatch(player) { // 取消匹配
	waits.splice(player);
	player.state = PlayerStatus.FREE;
	var response = {
		"type": "sc_match_cancel",
	}
	player.sendText(JSON.stringify(response));
}
function successMatch(player) { // 成功匹配
	waits.splice(player);
	player.state = PlayerStatus.GAME;
}
function arraySortByTime(arr) {
	return arr.sort(function(lhs, rhs) {
		if(lhs.time < rhs.time) {
			return -1;
		} else {
			return 1;
		}
	});
}
