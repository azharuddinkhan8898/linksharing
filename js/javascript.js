$(function() {
  var digits = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  var randomid = "";
  var connctID;
  var peer;
  var usernm;
  var call;
  var ref = firebase.database().ref('users/');

  // getUrlParameter = function(name) {
  //     var results = new RegExp('[\#&]' + name + '=([^&#]*)').exec(window.location.href);
  //     if (results == null) {
  //         return null;
  //     } else {
  //         return results[1] || 0;
  //     }
  // }


    for (i = 0; i < 10; i++) {
      var rt = digits[Math.floor(Math.random() * 62)];
      randomid += rt;
    }
    runpeer();


  function runpeer() {
    peer = new Peer(randomid, { host: 'azhar-peerjs.herokuapp.com', port: 80, path: '/' });
    peer.on('open', function(id) {
      console.log('My peer ID is: ' + id);
      if($("#qrcode").length){
        $('#qrcode').qrcode(id);
      }
      
    });
    
    if($("video").length){
      const qrScanner = new QrScanner($("video"), result => console.log('decoded qr code:', result));
    }

    

    connpeer(connctID);
    localStorage.setItem("connectedwith", connctID);

    peer.on('error', function(err) {
      if (err.type == 'unavailable-id') {
        alert("id is taken");
      }
    });
    peer.on('connection', function(conn) {
      console.log(conn.peer + " is connected with you");
      if (localStorage.getItem("connectedwith") != conn.peer) {
        connpeer(conn.peer);
      }

      conn.on('data', function(data) {
        //console.log('Received', data);
        
      });
    });
    // peer.on('disconnected', function() {
    //     console.log("disconnected");
    //      peer.reconnect();
    // });
    // peer.on('close', function() {
    //     console.log("close");
    // });
  }

  function connpeer(connthis) {
    conn = peer.connect(connthis);
    conn.on('open', function() {
      
      
    });
  }

  // $("#sendbtn").click(function() {
  //   var getmsg = $("#msg").val();
  //   conn.send(getmsg);
  //   $(".msgs ul").append('<li class="another">' + getmsg + '</li><div class="clearfix"></div>');
  //   $("#msg").val("").focus();
  //   scrolltotop();
  // });
  // $(".clearchat").click(function() {
  //   var confirmclear = confirm("This will clear chat for both users.");
  //   if (confirmclear == true) {
  //     conn.send("vjdpcsdoJHVDjhb87%%^89(*xcvnxdhc");
  //     $(".msgs ul").empty();
  //   }
  // });

  // function scrolltotop() {
  //   $('.msgs').scrollTop($('.msgs').prop("scrollHeight"));
  // }

  // function selectText() {
  //   $("#userName").select();
  // }
  $(window).bind('beforeunload', function() {
    return 'It will close the current chat';
  });
});
