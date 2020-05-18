var lele = {
		'Weixin':function(){
		var ua = navigator.userAgent.toLowerCase();
		return (/micromessenger/.test(ua)) ? true : false ;
		},
		'start':function(){
		$.ajax({
			url: "/admin/api.php",
            dataType: "json",
			success: function (e) {
				lele.waittime = e.data.waittime;
				lele.ads = e.data.ads;
				config.logo = e.data.logo;
				up.pbgjz = e.data.pbgjz;
				up.trysee = e.data.trytime;
				config.sendtime =e.data.sendtime;
				config.color = e.data.color;
				config.dmrule = e.data.dmrule;
				config.group = lele.getCookie('group_id');
				danmuon = e.data.danmuon;
				console.log(danmuon);
				if(config.group < config.group_x && lele.ads.state=='on' && config.group!=''){
					if(lele.ads.set.state == '1'){
						lele.MYad.vod(lele.ads.set.vod.url,lele.ads.set.vod.link);
					}else if (lele.ads.set.state == '2'){
						lele.MYad.pic(lele.ads.set.pic.link,lele.ads.set.pic.time,lele.ads.set.pic.img);
					}
				} else {
					lele.play(config.url);
				}
			}
		});
	},
	'play':function(url){
		if (danmuon == 'off') {
			lele.player.play(url);
			$("#loading-box").remove();
		}else{
		if(config.av !=''){
			lele.player.bdplay(url);
		}
		else {
			lele.player.dmplay(url);
		}
		}
		$(function() {
 			$(".leleplayer-setting-speeds,.leleplayer-setting-speed-item").on("click", function() {
    			$(".speed-stting").toggleClass("speed-stting-open");
			});
   			$(".speed-stting.leleplayer-setting-speed-item").click(function() {
        			$(".leleplayer-setting-speeds.title").text($(this).text());
    		});
		});
		$(".leleplayer-fulloff-icon").on("click", function() {
			lele.dp.fullScreen.cancel();
		});
		$(".leleplayer-showing").on("click", function() {lele.dp.play();$(".vod-pic").remove();});
		if(config.title!=''){$("#vodtitle").html(config.title+'  '+config.sid); };
	},
	'dmid':function(){
		if (up.diyid[0] == 0 && config.id != '') {
 		   a = config.id,
  		   b = config.sid
		} else if (up.diyid[0] == 1 || !config.id) {
 		   a = up.diyid[1],
 		   b = up.diyid[2]
		}
		lele.id = config.id
	},
	'load':function(){
		setTimeout(function() {$("#link1").fadeIn();}, 100);
   		setTimeout(function() {$("#link1-success").fadeIn(); }, 500);
    	setTimeout(function() {$("#link2").show(); }, 1 * 1000);
		setTimeout(function() {$("#link3,#span").fadeIn();}, 2 * 1000);
	    lele.danmu.send();
		lele.danmu.list();
		lele.def();
		lele.dp.danmaku.opacity(1);
	},
	'def':function(){
		console.log('爱片网播放器开启');
		lele.stime = 0;
		lele.headt = leleck.get("headt");
		lele.lastt = leleck.get("lastt");
		lele.last_tip=parseInt(lele.lastt) +10;
		lele.frists= leleck.get('frists');
		lele.lasts= leleck.get('lasts');
	    lele.playtime = Number(lele.getCookie("time_" + config.url));
        lele.ctime = lele.formatTime(lele.playtime);
		lele.dp.on("loadedmetadata", function () {
//		    alert("loadedmetadata");
			lele.loadedmetadataHandler();
		});
		lele.dp.on("ended", function () {
//		    alert("ended");
			lele.endedHandler();
		});
		lele.dp.on('pause', function () {
//		    alert("pause");
			lele.MYad.pause.play(lele.ads.pause.link,lele.ads.pause.pic);
		});
		lele.dp.on('play', function () {
//		    alert("play");
			lele.MYad.pause.out();
		});
		lele.dp.on('timeupdate',function(e){
//		    alert("timeupdate");
			lele.timeupdateHandler();
		});
		if(lele.Weixin()){
		$("#loading-box").remove();
        }
		lele.jump.def()
	 },
	'video':{
		'play':function(){
	  	    lele.dp.play();
	  	    $("#loading-box").remove();
	  	    lele.jump.head();
		},
		'next':function(){
			top.location.href = up.mylink+config.next;
		},
		'seek':function(){
			lele.dp.seek(lele.playtime);
		},
		'end':function(){
			layer.msg("播放结束啦=。=");
		},
		'con_play':function(){
			if (danmuon == 'off') {lele.jump.head();}else{
       		var conplayer = ` <e>已播放至${lele.ctime}，继续上次播放？</e><d class="conplay-jump">是 <i id="num">${lele.waittime}</i>s</d><d class="conplaying">否</d>`;
        		$("#link3").html(conplayer);
      		 	var span = document.getElementById("num");
       		 	var num = span.innerHTML;
       		 	var timer = null;
      		 		setTimeout(function () {
       		   		timer = setInterval(function () {
        		    num--;
          		  	span.innerHTML = num;
           		 	if (num == 0) {
            		 	clearInterval(timer);
             		 	lele.video.seek();
             		 	lele.dp.play();
            		  	$(".memory-play-wrap,#loading-box").remove();
           		 	}
         		  	}, 1000);
					}, 1);
			};
       		var cplayer = `<div class="memory-play-wrap"><div class="memory-play"><span class="close">×</span><span>上次看到 </span><span>${lele.ctime}</span><span class="play-jump">跳转播放</span></div></div>`;
			$(".leleplayer-cplayer").append(cplayer);
     		$(".close").on("click", function () {
      		$(".memory-play-wrap").remove();
      		});
     		setTimeout(function () {
        		$(".memory-play-wrap").remove();
      		}, 20 * 1000);
      		$(".conplaying").on("click", function () {
        		clearTimeout(timer);
        		$("#loading-box").remove();
        		lele.dp.play();
				lele.jump.head();
      		});
      		$(".conplay-jump,.play-jump").on("click", function () {
        		clearTimeout(timer);
        		lele.video.seek();
        		$(".memory-play-wrap,#loading-box").remove();
        		lele.dp.play();
      		});
			
		}
	},
	'jump':{
		'def':function(){
			h =".leleplayer-setting-jfrist label";
			l =".leleplayer-setting-jlast label";
			f = "#fristtime";
			j = "#jumptime";
			a(h,'frists',lele.frists,'headt',lele.headt,f);
			a(l,'lasts',lele.lasts,'lastt',lele.lastt,j);
			function er() { layer.msg("请输入有效时间哟！");}
			function su() { layer.msg("设置完成，将在刷新或下一集生效");}
			function a(b,c,d,e,g,t) {
			$(b).on("click", function() {
				o = $(t).val();
				if( o > 0  ){
					$(b).toggleClass('checked');su();
					g=$(t).val();leleck.set(e,g);
				}
				else{
					er();
				};
			});
			if( d == 1){
				$(b).addClass('checked');
				$(b).click(function () {
					o = $(t).val();
					if( o > 0  ){
						leleck.set(c,0);
				}
				else{
					er();
				};
				});
			}
				else{
					$(b).click(function () {
					o = $(t).val();
					if( o > 0  ){
						leleck.set(c,1);
				}
				else{
					er();
				};
				});
				}
			};
			$(f).attr({"value": lele.headt});
			$(j).attr({"value": lele.lastt});
			lele.jump.last();
		},
		'head':function(){
			if(lele.stime>lele.playtime) lele.playtime=lele.stime;
			if(lele.frists==1){if (lele.headt>lele.playtime || lele.playtime == 0) {lele.jump_f=1}else{lele.jump_f=0}}
			if(lele.jump_f==1){lele.dp.seek(lele.headt);lele.dp.notice("已为您跳过片头");}
		},
		'last':function(){
			if (config.next != '') {
			if(lele.lasts==1){ 
			setInterval(function(){
 			   var e=lele.dp.video.duration-lele.dp.video.currentTime;
    			if(e<lele.last_tip) lele.dp.notice('即将为您跳过片尾');
    			if(lele.lastt>0&&e<lele.lastt){
        			lele.setCookie("time_" + config.url, "", -1);
        			lele.video.next();
        			};
			},1000);
			};
			} else {
    			$(".icon-xj").remove();
			};
		},
		'ad':function(a,b){
 		}
	},
	'danmu':{
		'send':function(){
			g = $(".lele-leleplayer-send-icon");
			d = $("#dmtext");
			h = ".leleplayer-comment-setting-";
			$(h + "color input").on("click", function() {
				r = $(this).attr("value");
				setTimeout(function() {
					d.css({
						"color": r
						});
					}, 100);
			});
			$(h + "type input").on("click", function() {
				t = $(this).attr("value");
				setTimeout(function() {
					d.attr("dmtype", t);
					}, 100);
			});
			
			$(h + "font input").on("click", function() {
				if (up.trysee > 0 && config.group == config.group_x) {
        			layer.msg("会员专属功能");
					return;
				};
				t = $(this).attr("value");
				setTimeout(function() {
					d.attr("size", t);
					}, 100);
			});
			g.on("click", function() {
    			a = document.getElementById("dmtext");
    			a = a.value;
    			b = d.attr("dmtype");
    			c = d.css("color");
    			z = d.attr("size");
    			for (var i = 0; i < up.pbgjz.length; i++) {
        			if (a.search(up.pbgjz[i]) != -1) {
            			layer.msg("您发送的内容含有敏感字符，请规范您的弹幕内容");
            			return;
        			}
    			}
      			if (a.length < 1 ) {
        			layer.msg("要输入内容啊~");
        			return;
    			}
    			var e = Date.parse(new Date());
    			var f = leleck.get('dmsent',e);
    			if(e-f<config.sendtime*1000){
     			layer.msg('请勿频繁操作！发送弹幕需间隔'+config.sendtime+'秒~');
     			return;
    			}
    			d.val("");
    			lele.dp.danmaku.send({
        			text: a,
        			color: c,
        			type: b,
        			size: z
    			});
    			leleck.set('dmsent',e);
			});
			function k(){g.trigger("click");
			};
			d.keydown(function(e){
			if(e.keyCode == 13){
				k();
			};
			});
		},
		'list':function(){
			$(".leleplayer-list-icon,.lele-leleplayer-send-icon").on("click", function() {
				$(".list-show").empty();
    				$.ajax({
        				url: config.api + "?ac=get&id=" + lele.id,
        				success: function(d) {
            				if (d.code == 23) {
                				 a = d.danmuku;
                				 b = d.name;
                				 c = d.danum;
                				$(".danmuku-num").text(c);
                				$(a).each(function(index, item) {
                    				 l = `<d class="danmuku-list" time="${item[0]}"><li>${lele.formatTime(item[0])}</li><li title="${item[4]}">${item[4]}</li><li title="用户：${item[3]}  IP地址：${item[5]}">${item[6]}</li><li class="report" onclick="lele.danmu.report(\'${item[5]}\',\'${b}\',\'${item[4]}\',\'${item[3]}\')">举报</li></d>`
                    				$(".list-show").append(l);
                				})
            				}
            				$(".danmuku-list").on("dblclick", function() {
                				lele.dp.seek($(this).attr("time"))
            				})
        				}
    				});
			});
		var liyih='<div class="dmrules"><a target="_blank" href="' +config.dmrule + '">弹幕礼仪 </a></div>';
		$("div.leleplayer-comment-box:last").append(liyih);
		$(".leleplayer-watching-number").text(up.usernum);
		$(".leleplayer-info-panel-item-title-amount .leleplayer-info-panel-item-title").html("违规词");
		for(var i=0;i<up.pbgjz.length;i++){
		var gjz_html="<e>"+up.pbgjz[i]+"</e>"; 
		$("#vod-title").append(gjz_html);
		}
		add('.leleplayer-list-icon', ".leleplayer-danmu", 'show');
		function add(div1, div2, div3, div4) {
		    $(div1).click(function() {
 		       $(div2).toggleClass(div3);
 		       $(div4).remove();
 		   });
		}
		},
		'report':function(a,b,c,d) {
			layer.confirm(''+c+'<!--br><br><span style="color:#333">请选择需要举报的类型</span-->', {
        			anim: 1,
        			title: '举报弹幕',
        			btn: ['违法违禁', '色情低俗', '恶意刷屏', '赌博诈骗', '人身攻击','侵犯隐私','垃圾广告','剧透','引战']
        			,btn3: function(index, layero){
         			   lele.danmu.post_r(a,b,c,d,'恶意刷屏');
        			},btn4: function(index, layero){
        			    lele.danmu.post_r(a,b,c,d,'赌博诈骗');
        			},btn5: function(index, layero){
            		    lele.danmu.post_r(a,b,c,d,'人身攻击');
        			},btn6: function(index, layero){
        			    lele.danmu.post_r(a,b,c,d,'侵犯隐私');
        			},btn7: function(index, layero){
        			    lele.danmu.post_r(a,b,c,d,'垃圾广告');
        			},btn8: function(index, layero){
            			lele.danmu.post_r(a,b,c,d,'剧透');
        			},btn9: function(index, layero){
            			lele.danmu.post_r(a,b,c,d,'引战');
        			}
    				}, function(index, layero){
      				  lele.danmu.post_r(a,b,c,d,'违法违禁');
    				}, function(index){
    				    lele.danmu.post_r(a,b,c,d,'色情低俗');
    		});
		},
		'post_r':function (a,b,c,d,type) {
			$.ajax({
        		type: "get",
        		url: config.api+'?ac=report&cid='+d+'&user='+a+'&type='+type+'&title='+b+'&text='+c,
        		cache: false,
        		dataType: 'json',
        		beforeSend: function() {
		        },
        		success: function (data) {
        		    layer.msg("举报成功！感谢您为守护弹幕作出了贡献");
        		},
        		error: function(data) {
         		   var msg ="服务故障 or 网络异常，稍后再试6！";
            layer.msg(msg);
        		}
    		});
    	}
	},
	'setCookie':function(c_name, value, expireHours){
	  var exdate = new Date();
      exdate.setHours(exdate.getHours() + expireHours);
      document.cookie = c_name + "=" + escape(value) + ((expireHours === null) ? "" : ";expires=" + exdate.toGMTString());
	},
	'getCookie':function(c_name){
	  if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start !== -1) {
		  c_start = c_start + c_name.length + 1;
		  c_end = document.cookie.indexOf(";", c_start);
		  if (c_end === -1) {
			c_end = document.cookie.length;
		  };
		  return unescape(document.cookie.substring(c_start, c_end));
		}
	  }
	  return "";
	},
	'formatTime':function(seconds){
		return [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)].join(":").replace(/\b(\d)\b/g, "0$1");
	},
	'loadedmetadataHandler':function(){
	  if (lele.playtime > 0 && lele.dp.video.currentTime < lele.playtime) {
		setTimeout(function () {lele.video.con_play()}, 1 * 1000);
	  } else {
				if (danmuon == 'off') {
					lele.jump.head();
				}else{
				lele.dp.notice("准备就绪，即将为您播放");
				lele.video.play();
				}
		

	  }
	  lele.dp.on("timeupdate", function () {
		lele.timeupdateHandler();
	  });
	},
	'timeupdateHandler':function() {
      lele.setCookie("time_" + config.url, lele.dp.video.currentTime, 24);
    },
	'endedHandler':function(){
	  lele.setCookie("time_" + config.url, "", -1);
	  if (config.next != '') {
		lele.dp.notice("5s后,将自动为您播放下一集");
		setTimeout(function () {
		  lele.video.next();
		}, 5 * 1000);
	  } else {
		lele.dp.notice("视频播放已结束");
		setTimeout(function () {
		  lele.video.end();
		}, 2 * 1000);
	  }
	},
	'player':{
		'play':function(url){
			$('body').addClass("danmu-off");
			lele.dp=new leleplayer({
				autoplay:true,
				element:document.getElementById('player'),
				theme:config.color,
				logo:config.logo,
				video: {
			url: url,
			pic: config.pic,
			type: 'auto',
            customType: {
                customHls: function(video, player) {
                    const hls = new Hls({
                        debug: false,
                        p2pConfig: {
                            logLevel: true,
                            live: false,
							 announce: "https://tracker.klink.tech",
                             wsSignalerAddr: 'wss://signal.klink.tech/ws',
                        
                            
                        }
                    });
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                    hls.p2pEngine.on('stats', function (data) {
                        totalP2PDownloaded = data["totalP2PDownloaded"];
                        totalP2PUploaded = data["totalP2PUploaded"];
                        updateStats();
						p2p();

                    }).on("peerId", function(peerIdData) {
                        _peerId = peerIdData;
                    }).on( "peers", function(peersData) {
                        _peers = peersData.length;
                         updateStats();
                         p2p();
                    });
                }
            }
			},
				});
    			 if(lele.Weixin()){
                var css = '<style type="text/css">';
                css += '#loading-box{display: none;}';
                css += '</style>';
                $('body').append(css).addClass("");
            }
				lele.def();
				lele.jump.head();				
			},
		'adplay':function(url){
			$('body').addClass("danmu-off");
			lele.ad=new leleplayer({
				autoplay:true,
				element:document.getElementById('ADplayer'),
				theme:config.color,
				logo:config.logo,
				video: {
			url: url,
			pic: config.pic,
			type: 'auto',
            customType: {
                customHls: function(video, player) {
                    const hls = new Hls({
                        debug: false,
                        p2pConfig: {
                            logLevel: true,
                            live: false,
							 announce: "https://tracker.klink.tech",
                             wsSignalerAddr: 'wss://signal.klink.tech/ws',
                        
                            
                        }
                    });
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                    hls.p2pEngine.on('stats', function (data) {
                        totalP2PDownloaded = data["totalP2PDownloaded"];
                        totalP2PUploaded = data["totalP2PUploaded"];
                        updateStats();
						p2p();

                    }).on("peerId", function(peerIdData) {
                        _peerId = peerIdData;
                    }).on( "peers", function(peersData) {
                        _peers = peersData.length;
                         updateStats();
                         p2p();
                    });
                }
            }
			},
				});
				$('.leleplayer-controller,.leleplayer-cplayer,.leleplayer-logo,#loading-box,.leleplayer-controller-mask').remove();
				$('.leleplayer-mask').show();
			lele.ad.on('timeupdate', function() {
			if (lele.ad.video.currentTime > lele.ad.video.duration-0.1) {
				$('body').removeClass("danmu-off");
				lele.ad.destroy();
				$("#ADplayer").remove();
				$("#ADtip").remove();
				lele.play(config.url);
				}
			});
		},
		'dmplay':function(url){
			lele.dmid();
			lele.dp=new leleplayer({
				autoplay:true,
				element:document.getElementById('player'),
				theme:config.color,
				logo:config.logo,
				video: {
			url: url,
			pic: config.pic,
			type: 'auto',
            customType: {
                customHls: function(video, player) {
                    const hls = new Hls({
                        debug: false,
                        p2pConfig: {
                            logLevel: true,
                            live: false,
							 announce: "https://tracker.klink.tech",
                             wsSignalerAddr: 'wss://signal.klink.tech/ws',
                        
                            
                        }
                    });
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                    hls.p2pEngine.on('stats', function (data) {
                        totalP2PDownloaded = data["totalP2PDownloaded"];
                        totalP2PUploaded = data["totalP2PUploaded"];
                        updateStats();
						p2p();

                    }).on("peerId", function(peerIdData) {
                        _peerId = peerIdData;
                    }).on( "peers", function(peersData) {
                        _peers = peersData.length;
                         updateStats();
                         p2p();
                    });
                }
            }
			},
				danmaku:{id:lele.id,api:config.api+'?ac=dm',user:config.user}
				});
			lele.load();
				
		},
		'bdplay':function(url){
			lele.dmid();
			lele.dp=new leleplayer({
				autoplay:true,
				element:document.getElementById('player'),
				theme:config.color,
				logo:config.logo,
				video: {
			url: url,
			pic: config.pic,
			type: 'auto',
            customType: {
                customHls: function(video, player) {
                    const hls = new Hls({
                        debug: false,
                        p2pConfig: {
                            logLevel: true,
                            live: false,
							 announce: "https://tracker.klink.tech",
                             wsSignalerAddr: 'wss://signal.klink.tech/ws',
                        }
                    });
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                    hls.p2pEngine.on('stats', function (data) {
                        totalP2PDownloaded = data["totalP2PDownloaded"];
                        totalP2PUploaded = data["totalP2PUploaded"];
                        updateStats();

                    }).on("peerId", function(peerIdData) {
                        _peerId = peerIdData;
                    }).on( "peers", function(peersData) {
                        _peers = peersData.length;
                         updateStats();
                    });
                }
            }
			},
				danmaku:{id:lele.id,api:config.api+'?ac=dm',user:config.user,addition:[config.api+'bilibili/?av='+config.av]}
				});
			lele.load();
		}
	},
	'MYad':{
		'vod':function(u,l){
			$("#ADtip").html('<a id="link" href="'+l+'" target="_blank">查看详情</a>');
			$("#ADplayer").click(function(){
				document.getElementById('link').click();
			});
			lele.player.adplay(u);
		},
		'pic':function(l,t,p){
			$("#ADtip").html('<a id="link" href="'+l+'" target="_blank">广告 <e id="time_ad">'+t+'</e></a><img src="'+p+'">');
			$("#ADtip").click(function(){
				document.getElementById('link').click();
			});
			    var span = document.getElementById("time_ad");
       		 	var num = span.innerHTML;
       		 	var timer = null;
      		 		setTimeout(function () {
       		   		timer = setInterval(function () {
        		    num--;
          		  	span.innerHTML = num;
           		 	if (num == 0) {
            		 	clearInterval(timer);
						lele.play(config.url);
						$('#ADtip').remove();
           		 	}
         		 }, 1000);
       		 }, 1);
			
		},
		'pause':{
			'play':function(l,p){
				if(lele.ads.pause.state == 'on'){
			var pause_ad_html = '<div id="player_pause"><div class="tip">广告</div><a href="'+l+'" target="_blank"><img src="'+p+'"></a></div>';
				$('#player').before(pause_ad_html);}
			},
			'out':function(){
				$('#player_pause').remove();
			}
		}
	}
}
document.write('<script src="//www.ipian.net/update.js?rnd=' + Math.random() +  '"><\/script>');

// 控制台报错
//setInterval(function() {
//window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized ? t("on") : (a = "off", ("undefined"!==typeof console.clear) && console.clear());
//debugger;
//}, 10);
