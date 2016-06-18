/**
 * Created by kyle on 6/15/16.
 */
var namespace = "";
var msgdata={};
var ip="flytpod:9090";
$.ajax({
    type: "POST",
    dataType: "json",
    data: JSON.stringify(msgdata),
    url: "http://"+ip+"/ros/get_global_namespace",
    success: function(data){
        if(data.success){
            namespace=data.param_info.param_value;
        }


    }
})
;